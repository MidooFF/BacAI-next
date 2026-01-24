"use client";
import React from "react";
import { InfoProvider } from "@/app/context/InfoContext";
import { ArabicWriter } from "./ArabicWriterClient";
import { BlackProvider } from "@/app/context/BlackContext";

export const ArabicWriterWrapper = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <ArabicWriter />
      </InfoProvider>
    </BlackProvider>
  );
};
