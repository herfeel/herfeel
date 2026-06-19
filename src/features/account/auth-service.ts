const DEFAULT_AUTH_API_URL = "https://herfeel.vn/wp-json/playah/v1";
const WORDPRESS_REQUEST_TIMEOUT_MS = 8000;

export const customerSessionCookieName = "playah_customer_session";
export const customerSessionMaxAge = 60 * 60 * 24 * 7;

export type AccountAuthMode = "login" | "register";

export type RegisterAccountInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type LoginAccountInput = {
  email: string;
  password: string;
};

export type AccountCustomer = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type AccountAuthResult = {
  ok: boolean;
  status: number;
  message: string;
  token?: string;
  user?: AccountCustomer;
};

type WordPressAuthResponse = {
  ok?: boolean;
  token?: string;
  user?: AccountCustomer;
  message?: string;
  code?: string;
};

export function getAccountAuthApiUrl() {
  return process.env.WORDPRESS_AUTH_API_URL || DEFAULT_AUTH_API_URL;
}

export function getCustomerSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: customerSessionMaxAge,
  };
}

export function getClearCustomerSessionCookieOptions() {
  return {
    ...getCustomerSessionCookieOptions(),
    maxAge: 0,
  };
}

export async function loginWordPressCustomer(input: LoginAccountInput): Promise<AccountAuthResult> {
  const response = await callAuthApi("/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.ok || !response.data.token) {
    return {
      ok: false,
      status: response.status,
      message: getWordPressAuthErrorMessage(response.data, "Email hoặc mật khẩu không đúng."),
    };
  }

  return {
    ok: true,
    status: response.status,
    message: "Đăng nhập thành công.",
    token: response.data.token,
    user: response.data.user,
  };
}

export async function registerWordPressCustomerViaAuthApi(input: RegisterAccountInput): Promise<AccountAuthResult> {
  const response = await callAuthApi("/register", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: getWordPressAuthErrorMessage(response.data, "Không thể tạo tài khoản WordPress."),
    };
  }

  return {
    ok: true,
    status: response.status || 201,
    message: "Tạo tài khoản thành công.",
    token: response.data.token,
    user: response.data.user,
  };
}

export async function getCurrentCustomer(token: string): Promise<AccountAuthResult> {
  const response = await callAuthApi("/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: getWordPressAuthErrorMessage(response.data, "Phiên đăng nhập đã hết hạn."),
    };
  }

  return {
    ok: true,
    status: response.status,
    message: "Đã đăng nhập.",
    user: response.data.user,
  };
}

export async function logoutCustomer(token: string): Promise<AccountAuthResult> {
  const response = await callAuthApi("/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ok: response.ok,
    status: response.status,
    message: response.ok ? "Đã đăng xuất." : getWordPressAuthErrorMessage(response.data, "Không thể đăng xuất phiên WordPress."),
  };
}

async function callAuthApi(path: string, init: RequestInit) {
  try {
    const headers = new Headers(init.headers);
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    const response = await fetch(new URL(path.replace(/^\//, ""), withTrailingSlash(getAccountAuthApiUrl())), {
      ...init,
      headers,
      signal: AbortSignal.timeout(WORDPRESS_REQUEST_TIMEOUT_MS),
    });
    const data = (await response.json().catch(() => ({}))) as WordPressAuthResponse;

    return { ok: response.ok && data.ok !== false, status: response.status, data };
  } catch {
    return {
      ok: false,
      status: 502,
      data: { message: "Không kết nối được WordPress auth endpoint." } satisfies WordPressAuthResponse,
    };
  }
}

function withTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}

function getWordPressAuthErrorMessage(data: WordPressAuthResponse, fallback: string) {
  if (data.code === "rest_no_route") return "WordPress chưa bật PlayAh auth bridge. Cần cài và active plugin playah-auth-bridge.";
  if (data.code === "existing_user_login" || data.code === "existing_user_email" || data.code === "playah_existing_customer") return "Email này đã có tài khoản.";
  if (data.code === "playah_rate_limited") return "Bạn thử quá nhiều lần. Vui lòng quay lại sau vài phút.";
  if (data.code === "playah_invalid_credentials") return "Email hoặc mật khẩu không đúng.";

  return data.message || fallback;
}
