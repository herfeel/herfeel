"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type MutableRefObject, type ReactNode } from "react";
import { accountAuthChangedEvent } from "@/features/account/auth-client-events";
import { cartReducer, initialCartState } from "./cart-store";
import type { CartAction, CartState } from "./cart-types";
import { clampCartState, mergeAccountCartStates } from "./cart-utils";

const cartStorageKey = "playah-cart";
const accountSyncStorageKey = "playah-cart-account-sync";

type AccountSyncStatus = "anonymous" | "authenticated" | "unavailable";

type CartContextValue = {
  state: CartState;
  dispatch: (action: CartAction) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const hydrated = useRef(false);
  const accountSyncStatus = useRef<AccountSyncStatus>("anonymous");
  const syncInFlight = useRef(false);
  const stateRef = useRef(state);
  const lastSyncedSnapshot = useRef<string | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const storedState = getStoredCartState();
    const localState = storedState ? clampCartState(storedState) : initialCartState;
    lastSyncedSnapshot.current = getStoredAccountSyncSnapshot();

    if (storedState) dispatch({ type: "cart/hydrate", payload: localState });
    stateRef.current = localState;

    queueMicrotask(() => {
      hydrated.current = true;
      void syncAccountCart(localState, dispatch, accountSyncStatus, syncInFlight, lastSyncedSnapshot);
    });

    const handleAuthChanged = () => {
      void syncAccountCart(stateRef.current, dispatch, accountSyncStatus, syncInFlight, lastSyncedSnapshot);
    };

    window.addEventListener(accountAuthChangedEvent, handleAuthChanged);

    return () => {
      window.removeEventListener(accountAuthChangedEvent, handleAuthChanged);
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(cartStorageKey, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!hydrated.current || accountSyncStatus.current !== "authenticated") return;

    const snapshot = getAccountCartSnapshot(state);
    if (snapshot === lastSyncedSnapshot.current) return;

    const timeout = window.setTimeout(() => {
      void saveAccountCart(state, lastSyncedSnapshot);
    }, 800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

function getStoredCartState(): CartState | null {
  const stored = window.localStorage.getItem(cartStorageKey);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as CartState;
  } catch {
    window.localStorage.removeItem(cartStorageKey);
    return null;
  }
}

function getStoredAccountSyncSnapshot(): string | null {
  return window.localStorage.getItem(accountSyncStorageKey);
}

async function syncAccountCart(
  localCart: CartState,
  dispatch: (action: CartAction) => void,
  accountSyncStatus: MutableRefObject<AccountSyncStatus>,
  syncInFlight: MutableRefObject<boolean>,
  lastSyncedSnapshot: MutableRefObject<string | null>,
) {
  if (syncInFlight.current) return;

  syncInFlight.current = true;

  try {
    const response = await fetch("/api/account/cart", { cache: "no-store" });

    if (response.status === 401) {
      accountSyncStatus.current = "anonymous";
      lastSyncedSnapshot.current = null;
      return;
    }

    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; cart?: CartState | null };
    if (!response.ok || data.ok === false) {
      accountSyncStatus.current = "unavailable";
      return;
    }

    const remoteCart = data.cart ? clampCartState(data.cart) : null;
    const localSnapshot = getAccountCartSnapshot(localCart);
    const remoteIsAuthoritative = remoteCart && localSnapshot === lastSyncedSnapshot.current;
    const mergedCart = remoteIsAuthoritative ? remoteCart : mergeAccountCartStates(localCart, remoteCart);
    const mergedSnapshot = getAccountCartSnapshot(mergedCart);

    accountSyncStatus.current = "authenticated";
    lastSyncedSnapshot.current = mergedSnapshot;
    dispatch({ type: "cart/hydrate", payload: mergedCart });
    window.localStorage.setItem(cartStorageKey, JSON.stringify(mergedCart));
    window.localStorage.setItem(accountSyncStorageKey, mergedSnapshot);

    if (!remoteCart || getAccountCartSnapshot(remoteCart) !== mergedSnapshot) {
      await saveAccountCart(mergedCart, lastSyncedSnapshot);
    }
  } finally {
    syncInFlight.current = false;
  }
}

async function saveAccountCart(cart: CartState, lastSyncedSnapshot: MutableRefObject<string | null>) {
  const syncedCart = { ...clampCartState(cart), updatedAt: cart.updatedAt };
  const syncedSnapshot = getAccountCartSnapshot(syncedCart);
  const response = await fetch("/api/account/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart: syncedCart }),
  }).catch(() => null);

  if (!response?.ok) return;

  const data = (await response.json().catch(() => ({}))) as { ok?: boolean; cart?: CartState | null };
  if (data.ok === false) return;

  lastSyncedSnapshot.current = syncedSnapshot;
  window.localStorage.setItem(accountSyncStorageKey, syncedSnapshot);
}

function getAccountCartSnapshot(cart: CartState) {
  const clampedCart = clampCartState(cart);

  return JSON.stringify({
    source: clampedCart.source,
    items: clampedCart.items.map((item) => ({
      key: item.key,
      productId: item.productId,
      variationId: item.variationId,
      sku: item.sku,
      name: item.name,
      variantLabel: item.variantLabel,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      image: item.image,
      attributes: item.attributes,
    })),
    coupons: clampedCart.coupons,
    totals: clampedCart.totals,
  });
}
