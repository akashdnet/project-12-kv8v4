"use client"; // ✅ Add this at the top

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return <KindeProvider>{children}</KindeProvider>;
};
