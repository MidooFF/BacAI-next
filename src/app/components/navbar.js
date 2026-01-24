"use client";
import Link from "next/link";
import React from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="nav section-padding shadow-0 ">
      <div className="links">
        {/* <NavLink to="/services"> */}
        <Link
          href="/services"
          className={pathname === "/services" ? "active" : null}
        >
          الخدمات
        </Link>
        {/* </NavLink> */}
      </div>
      <div className="logo flex  w-fit  flex-1 flex justify-end">
        <div className="logo-text w-fit gradient-reverse text-4xl flex items-center max-sm:text-3xl text-transparent ml-[5px]">
          BacAI
        </div>
        <img src="/assets/logo-icon.png" alt="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
