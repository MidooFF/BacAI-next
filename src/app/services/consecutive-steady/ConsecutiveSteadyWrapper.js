"use client";
import React from "react";
import { InfoProvider } from "@/app/context/InfoContext";
import { ConsecutiveSteady } from "./ConsecutiveSteadyClient";
import { BlackProvider } from "@/app/context/BlackContext";

export const ConsecutiveSteadyWrapper = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <ConsecutiveSteady />
      </InfoProvider>
    </BlackProvider>
  );
};
