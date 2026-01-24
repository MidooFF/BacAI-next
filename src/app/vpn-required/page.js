import React from "react";
import { redirect } from "next/navigation";
import { checkVPN } from "../hooks/vpnCheck";
import { VPNClient } from "./VPNClient";

const page = async () => {
  return <VPNClient></VPNClient>;
};

export default page;
