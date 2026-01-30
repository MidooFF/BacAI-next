"use client";
import React, { useEffect, useState, useRef } from "react";
import "./VerifyResetCode.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const VerifyResetCodeClient = () => {
  const router = useRouter();
  const [codeError, setCodeError] = useState("");

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    console.log("running");
    try {
      const response = await axios.post(
        "https://bacai-backend.onrender.com/verify-reset-code",
        {
          email: localStorage.getItem("email_to_reset"),
          code: code,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      router.push("/reset-password");
    } catch (err) {
      if (err.status == 400) {
        setCodeError("الكود خاطئ أو منتهي الصلاحية");
      } else {
        setCodeError("");
      }
      setLoading(false);
    }
  };

  return (
    <div className="section-padding mt-[40px]">
      <h1 className="text-center text-5xl max-sm:text-3xl ">تأكيد الهوية</h1>
      <div
        className="bg-white shadow-3 rounded-[20px] w-[500px]  mx-auto mt-[40px] p-[15px] py-[50px] pb-[30px]
      max-sm:mt-[20px] max-sm:w-full"
      >
        <div className="flex flex-col mb-[30px]">
          <label
            htmlFor="verify-code"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            كود التحقق:
          </label>
          <div className="main-input w-full">
            <input
              dir="ltr"
              className="w-full"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              type="text"
              id="verify-code"
            />
            <div></div>
          </div>
          <div className={`handle-error ${codeError ? "active" : "disactive"}`}>
            {codeError}
          </div>
        </div>
        <div className="flex justify-center">
          {" "}
          <button
            disabled={loading ? true : false}
            onClick={handleLogin}
            className={`gradient text-white text-2xl ext-center p-[10px] mt-[60px] rounded-[10px]
        cursor-pointer max-sm:text-[20px] max-sm:mt-[30px] font-bold ${
          loading ? "opacity-70" : ""
        }`}
          >
            تحقق
          </button>
        </div>
      </div>
    </div>
  );
};
