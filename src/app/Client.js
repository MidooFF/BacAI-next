"use client";
import { useRouter } from "next/navigation";
import { checkVPN } from "./hooks/vpnCheck";
import { useEffect } from "react";
import { LoadingScreen } from "./components/loadingScreen";
export const Client = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/services");
  });
  return <div></div>;
};
