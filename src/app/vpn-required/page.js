import React from "react";
import { redirect } from "next/navigation";
import { checkVPN } from "../hooks/vpnCheck";
import { VPNClient } from "./VPNClient";

export const metadata = {
  title: "vpn required",
  robots: {
    index: false,
    follow: true,
  },
};

const page = async () => {
  return <VPNClient></VPNClient>;
};

export default page;
