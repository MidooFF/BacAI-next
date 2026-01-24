"use client";
import React from "react";
import { InfoProvider } from "@/app/context/InfoContext";
import { ArabicWriter } from "./ArabicWriterClient";
import { BlackProvider } from "@/app/context/BlackContext";
import { AuthProvider } from "@/app/context/AuthContext";

export const ArabicWriterWrapper = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <AuthProvider>
          <ArabicWriter />
        </AuthProvider>
      </InfoProvider>
    </BlackProvider>
  );
};
