"use client";
import { VerifyResetCodeClient } from "./VerifyResetCodeClient";
import { AuthProvider } from "../context/AuthContext";

export const VerifyResetCodeWrapper = () => {
  return (
    <AuthProvider>
      <VerifyResetCodeClient></VerifyResetCodeClient>
    </AuthProvider>
  );
};
