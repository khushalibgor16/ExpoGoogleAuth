import { createContext } from "react";

export type User = {
  id: string | null;
  name: string | null;
  email: string | null;
  picture: string | null;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  googleSignInUnavailable?: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signOut: () => {},
});