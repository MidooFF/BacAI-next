"use client";
import { LoginClient } from "./LoginClient";
import { AuthProvider } from "../context/AuthContext";

export const LoginClientWrapper = () => {
  return (
    <AuthProvider>
      <LoginClient></LoginClient>
    </AuthProvider>
  );
};
