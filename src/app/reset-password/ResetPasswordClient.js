"use client";
import React, { useEffect, useState, useRef } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import { useRouter } from "next/navigation";
import Link from "next/link";
import passwordComplexity from "joi-password-complexity";

export const ResetPasswordClient = () => {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  const [password, setPassword] = useState("");

  const passwordOptions = {
    min: 7,
    max: 26,
    lowerCase: 0,
    upperCase: 0,
    numeric: 1,
    symbol: 0,
    requirementCount: 0,
  };
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    // const passwordValidate =
    //   passwordComplexity(passwordOptions).validate(password);
    // if (passwordValidate.error) {
    //   const type = passwordValidate.error.details[0].type;
    //   if (type == "string.empty") setPasswordError("هذه الخانة مطلوبة");
    //   if (type == "passwordComplexity.tooShort")
    //     setPasswordError("يجب إدخال 8 أحرف على الأقل");
    //   if (type == "passwordComplexity.numeric")
    //     setPasswordError("يجب إدخال رقم واحد على الأقل");
    //   return;
    // } else {
    //   setPasswordError("");
    // }
    setLoading(true);
    console.log("running");
    try {
      const response = await axios.post(
        "https://bacai-backend.onrender.com/reset-password",
        {
          email: localStorage.getItem("email_to_reset"),
          newPassword: password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.log(err);
      if (err.status == 400) {
        setPasswordError("الكود خاطئ أو منتهي الصلاحية");
      } else {
        setPasswordError("");
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
            htmlFor="verify-code"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            كلمة السر الجديدة:
          </label>
          <div className="main-input w-full">
            <input
              dir="ltr"
              className="w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              id="verify-code"
            />
            <div></div>
          </div>
          <div
            className={`handle-error ${passwordError ? "active" : "disactive"}`}
          >
            {passwordError}
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
            تأكيد
          </button>
        </div>
      </div>
    </div>
  );
};
