import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export interface AdminSessionState {
  isLoggedIn: boolean;
  isValidating: boolean;
  token: string;
}

export function useAdmin() {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();

  const isLoggedIn = !!identity;
  const token = identity?.getPrincipal().toText() ?? "";

  const session: AdminSessionState = {
    isLoggedIn,
    isValidating: isInitializing || isLoggingIn,
    token,
  };

  return {
    session,
    login,
    logout: clear,
  };
}
