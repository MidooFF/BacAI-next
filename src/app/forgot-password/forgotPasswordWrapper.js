"use client";
import { ForgotPasswordClient } from "./forgotPasswordClient";
import { AuthProvider } from "../context/AuthContext";

export const ForgotPasswordWrapper = () => {
  return (
    <AuthProvider>
      <ForgotPasswordClient></ForgotPasswordClient>
    </AuthProvider>
  );
};
