"use client";
import React from "react";
import { InfoProvider } from "@/app/context/InfoContext";
import { ComplexNumTrans } from "./ComplexNumTransClient";
import { BlackProvider } from "@/app/context/BlackContext";

export const ComplexNumTransWrapper = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <ComplexNumTrans />
      </InfoProvider>
    </BlackProvider>
  );
};
