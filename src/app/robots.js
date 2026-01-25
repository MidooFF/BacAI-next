import { userAgent } from "next/server";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/vpn-required"],
      },
    ],
  };
}
