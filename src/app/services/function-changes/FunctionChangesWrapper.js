"use client";
import React from "react";
import { InfoProvider } from "@/app/context/InfoContext";
import { FunctionChanges } from "./FunctionChangesClient";
import { BlackProvider } from "@/app/context/BlackContext";

export const FunctionChangesWrapper = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <FunctionChanges />
      </InfoProvider>
    </BlackProvider>
  );
};
