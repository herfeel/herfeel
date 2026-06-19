export type AuthStatus = "anonymous" | "authenticated" | "loading";

export type AuthMode = "login" | "register";

export type AuthFormState = {
  status: AuthStatus;
  mode: AuthMode;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type AuthBridgeResult = {
  ok: boolean;
  message?: string;
};

export interface AuthBridge {
  getStatus(): Promise<AuthStatus>;
  login(state: AuthFormState): Promise<AuthBridgeResult>;
  register(state: AuthFormState): Promise<AuthBridgeResult>;
  logout(): Promise<AuthBridgeResult>;
}
