"use client";
import React from "react";
import { InfoProvider } from "@/app/context/InfoContext";
import { ComplexEquations } from "./ComplexEquations";
import { BlackProvider } from "@/app/context/BlackContext";

export const ComplexEquationsWrapper = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <ComplexEquations />
      </InfoProvider>
    </BlackProvider>
  );
};
