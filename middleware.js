import { NextResponse } from "next/server";

// This log proves the file is loaded
console.log("🎯 MIDDLEWARE FILE LOADED at server startup");

export default async function middleware(request) {
  // This log proves the function executes
  console.log("🔥 MIDDLEWARE EXECUTED for:", request.nextUrl.pathname);

  // Force redirect EVERYONE
  console.log("🔀 Redirecting to /vpn-required");
  return NextResponse.redirect(new URL("/vpn-required", request.url));
}

// Remove the config matcher for now - test with default
// export const config = {
//   matcher: "/",
// };
