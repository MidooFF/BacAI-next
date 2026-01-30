"use client";
import React, { useEffect, useState } from "react";
import "./forgot-password.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ForgotPasswordClient = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");

  const [email, setEmail] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!emailPattern.test(email)) {
      setEmailError("هذا البريد الالكتروني غير صالح");
      return;
    } else {
      setEmailError("");
    }

    setLoading(true);
    console.log("running");
    try {
      const response = await axios.post(
        "https://bacai-backend.onrender.com/forgot-password",
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("email_to_reset", email);
      router.push("/verify-reset-code");
      setLoading(false);
    } catch (err) {
      if (err.status == 401) {
        setEmailError("هذا البريد الالكتروني غير مسجل في قاعدة البيانات");
      } else {
        setEmailError("");
      }
      setLoading(false);
    }
  };

  return (
    <div className="section-padding mt-[40px]">
      <h1 className="text-center text-5xl max-sm:text-3xl ">تغيير كلمة السر</h1>
      <div
        className="bg-white shadow-3 rounded-[20px] w-[500px]  mx-auto mt-[40px] p-[15px] py-[50px] pb-[30px]
      max-sm:mt-[20px] max-sm:w-full"
      >
        <div className="flex flex-col mb-[30px]">
          <label
            htmlFor="forgot-password-email"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            البريد الالكتروني:
          </label>
          <div className="main-input w-full">
            <input
              dir="ltr"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="forgot-password-email"
            />
            <div></div>
          </div>
          <div
            className={`handle-error ${emailError ? "active" : "disactive"}`}
          >
            {emailError}
          </div>
        </div>
        <p>
          أدخل البريد الالكتروني الذي سجلت فيه الدخول وسيصلك كود من خلاله للتحقق
          من الهوية
        </p>

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
            إرسال الكود
          </button>
        </div>
      </div>
    </div>
  );
};
