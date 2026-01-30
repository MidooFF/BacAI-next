"use client";
import { ResetPasswordClient } from "./ResetPasswordClient";
import { AuthProvider } from "../context/AuthContext";

export const ResetPasswordWrapper = () => {
  return (
    <AuthProvider>
      <ResetPasswordClient></ResetPasswordClient>
    </AuthProvider>
  );
};
