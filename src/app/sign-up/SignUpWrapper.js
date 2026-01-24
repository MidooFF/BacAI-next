"use client";
import React from "react";
import { SignUp } from "./SignUpClient";
import { AuthProvider } from "../context/AuthContext";

export const SignUpWrapper = () => {
  return (
    <AuthProvider>
      <SignUp></SignUp>
    </AuthProvider>
  );
};
