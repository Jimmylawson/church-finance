import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { login as loginRequest, logout as logoutRequest, type LoginRequest, type LoginResponse } from "@/lib/auth";
import { setApiAccessToken } from "@/lib/apiInstance";
import type { UserResponse } from "@/lib/users";

const AUTH_STORAGE_KEY = "ledgerly-auth-session";

type AuthSession = {
  accessToken: string;
  expiresAt: string;
  user: UserResponse;
};

type AuthContextValue = {
  user: UserResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  completeLogin: (response: LoginResponse) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStoredSession = (): AuthSession | null => {
  const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(storedSession) as AuthSession;

    if (!parsedSession.accessToken || !parsedSession.user || !parsedSession.expiresAt) {
      return null;
    }

    if (new Date(parsedSession.expiresAt).getTime() <= Date.now()) {
      return null;
    }

    return parsedSession;
  } catch {
    return null;
  }
};

const persistSession = (session: AuthSession | null) => {
  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const storedSession = readStoredSession();
    setSession(storedSession);
    setApiAccessToken(storedSession?.accessToken ?? null);
    setIsInitializing(false);
  }, []);

  const completeLogin = (response: LoginResponse) => {
    const nextSession: AuthSession = {
      accessToken: response.accessToken,
      expiresAt: response.expiresAt,
      user: response.user,
    };

    setSession(nextSession);
    persistSession(nextSession);
    setApiAccessToken(nextSession.accessToken);
  };

  const login = async (credentials: LoginRequest) => {
    const response = await loginRequest(credentials);
    completeLogin(response);

    return response;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setSession(null);
      persistSession(null);
      setApiAccessToken(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,
      isAuthenticated: Boolean(session?.accessToken),
      isInitializing,
      login,
      completeLogin,
      logout,
    }),
    [isInitializing, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
