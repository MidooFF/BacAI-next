import React from "react";
import { TbMathFunction } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import "./Home.css";
import { checkVPN } from "../hooks/vpnCheck";
import { redirect } from "next/navigation";
import { HomeClient } from "./HomeClient";
import { InfoProvider } from "../context/InfoContext";
import { BlackProvider } from "../context/BlackContext";

const Home = () => {
  return (
    <BlackProvider>
      <InfoProvider>
        <HomeClient></HomeClient>
      </InfoProvider>
    </BlackProvider>
  );
};

export default Home;
