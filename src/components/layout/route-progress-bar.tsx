"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const START_DELAY_MS = 120;
const COMPLETE_DELAY_MS = 260;

type ProgressState = "idle" | "loading" | "complete";

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const [state, setState] = useState<ProgressState>("idle");
  const startTimer = useRef<number | null>(null);
  const completeTimer = useRef<number | null>(null);
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    function clearTimers() {
      if (startTimer.current) window.clearTimeout(startTimer.current);
      if (completeTimer.current) window.clearTimeout(completeTimer.current);
      startTimer.current = null;
      completeTimer.current = null;
    }

    function completeProgress() {
      clearTimers();
      setState("complete");
      completeTimer.current = window.setTimeout(() => {
        setState("idle");
        pendingHref.current = null;
      }, COMPLETE_DELAY_MS);
    }

    function normalizeUrl(href: string) {
      try {
        return new URL(href, window.location.href);
      } catch {
        return null;
      }
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target) return;

      const nextUrl = normalizeUrl(link.href);
      if (!nextUrl || nextUrl.origin !== window.location.origin) return;
      if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search) return;

      clearTimers();
      pendingHref.current = `${nextUrl.pathname}${nextUrl.search}`;
      startTimer.current = window.setTimeout(() => setState("loading"), START_DELAY_MS);
    }

    function handlePageShow() {
      if (!pendingHref.current) return;
      completeProgress();
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("pageshow", handlePageShow);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (!pendingHref.current) return;

    if (startTimer.current) window.clearTimeout(startTimer.current);
    startTimer.current = null;
    setState("complete");
    if (completeTimer.current) window.clearTimeout(completeTimer.current);
    completeTimer.current = window.setTimeout(() => {
      setState("idle");
      pendingHref.current = null;
    }, COMPLETE_DELAY_MS);
  }, [routeKey]);

  return <div className="route-progress-bar" data-state={state} aria-hidden="true" />;
}
