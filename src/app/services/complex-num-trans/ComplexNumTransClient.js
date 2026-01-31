"use client";
import React, { useRef, useState, useEffect, createRef } from "react";
import "./ComplexNumTrans.css";
import "../Services.css";
import "../Home.css";
import "katex/dist/katex.min.css";
import { useFetch } from "@/app/hooks/useFetch";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useBlack } from "@/app/context/BlackContext";
import { useInfo } from "@/app/context/InfoContext";
import { InlineMath, BlockMath } from "react-katex";

export const ComplexNumTrans = () => {
  const functionRef = useRef();
  const [func, setFunc] = useState("");
  const [trans, setTrans] = useState("");
  const { data, loading, error, fetchData } = useFetch();
  const [requestAgain, setRequestAgain] = useState(0);
  const { toggleInfo } = useInfo();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("مثلثي");
  console.log(selectedOption);

  const options = ["مثلثي", "أسي", "جبري"];

  const katexOptions = {
    output: "html",
    strict: false,
    trust: false,
    maxSize: Infinity,
    maxExpand: 1000,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: {},
    lineBreak: true, // Enable line breaks
  };

  useEffect(() => {
    if (func.length > 0 && requestAgain) {
      fetchData(
        `حلل تغيرات التابع ${func} باللغة العربية. التزم بالتعليمات التالية بدقة تامة:

1.  **التنسيق الرياضي:**
    *   استخدم & قبل وبعد أي **رمز رياضي أو تعبير جبري قصير** مدمج في سياق الجملة. أمثلة: &R&, &−∞&, &x = 0&, &f(0) = -4&, &(-∞, 0)&, &f'(x) > 0&.
    *   استخدم $ قبل وبعد أي **معادلة أو صيغة رياضية رئيسية** تحتاج سطراً مستقلاً (مثل النهايات، إيجاد المشتقة الرئيسية، مقارنات).
    *   **هام:** إذا كانت الصيغة الرياضية (مثل المشتقة &f'(x) = 3x^2&) قصيرة ويمكن دمجها في جملة، استخدم & بدلاً من $. استخدم $ فقط للصيغ التي تتطلب سطرها الخاص.
    *   وتأكد أن لا يكون هناك عبارتان رياضيتان متتاليتان (أي لا يجب أن يكون هناك عبارتان محوطان ب& أو $ خلف بعض)(أي مرة نص عربي ومرة نص رياضي)
    *   لا تستخدم أي علامات أو تنسيقات أخرى.

2.  **المحتوى المطلوب:**
    *  حول العدد العقدي: ${func} إلى الشكل ${selectedOption}

`
      );
      // setRequestAgain(requestAgain + 1);
    }
  }, [func, requestAgain]);
  const processTextFormatting = (text) => {
    if (!text) return null;

    // Split by ** for main titles
    return text
      .replaceAll("arctan", "arg")
      .split(/\*\*(.*?)\*\*/)
      .map((segment, index) => {
        if (index % 2 === 1) {
          // This is a main title (between **)
          return (
            <h3 key={index} className="main-title">
              {segment}
            </h3>
          );
        } else {
          // Process the remaining text for * markers
          return segment.split(/\*(.*?)\*/).map((subSegment, subIndex) => {
            if (subIndex % 2 === 1) {
              // This is a sub title (between *)
              return (
                <h4 key={`${index}-${subIndex}`} className="sub-title">
                  {subSegment}
                </h4>
              );
            } else {
              // Regular text
              return <span key={`${index}-${subIndex}`}>{subSegment}</span>;
            }
          });
        }
      });
  };

  // Function to render text with mixed Arabic and math expressions
  const renderMixedContent = (text) => {
    if (!text) return null;

    return text
      .replaceAll("arctan", "arg")
      .split("&")
      .map((part, index) => {
        // Even indices are Arabic text, odd indices are inline math
        if (index % 2 === 0) {
          return (
            <span key={index} dir="rtl">
              {processTextFormatting(part)}
            </span>
          );
        } else {
          return (
            <span key={index} dir="ltr">
              <InlineMath settings={katexOptions} math={part.trim()} />
            </span>
          );
        }
      });
  };

  // Function to parse the entire response
  const parseResponse = (responseText) => {
    if (!responseText) return null;

    return responseText
      .replaceAll("arctan", "arg")
      .split("$")
      .map((segment, index) => {
        // Even indices are mixed content (Arabic + inline math)
        // Odd indices are block math equations
        if (index % 2 === 0) {
          return (
            <div key={index} className="response-paragraph" dir="rtl">
              {renderMixedContent(segment)}
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="math-block my-[1rem] mx-[0] text-center"
              dir="ltr"
            >
              <InlineMath settings={katexOptions} math={segment.trim()} />
            </div>
          );
        }
      });
  };

  return (
    <div className="container section-padding func-changes-container">
      <div className="flex fade-in fade-in-1 justify-start max-sm:justify-between items-center">
        <h1 className="header text-[30px] my-[20px] fade-in fade-in-1">
          تحويل عدد عقدي
        </h1>
        <IoInformationCircleOutline
          className="text-2xl text-gray-500 cursor-pointer mr-[20px]"
          onClick={() => {
            toggleInfo(
              <div>
                <p>يجب اختيار اللغة الانكليزية في لوحة المفاتيح </p>
                <br />
                <p>استعمال * لعمليات الضرب</p>
                <p>استعمال / لعمليات القسمة</p>
                <br />
                <p>يجب تحديد بسط ومقام كسر بأقواس</p>
                <p>مثال: </p>
                <p>اذا كان كسر بسطه x + 1 ومقامه x + 2 يكتب:</p>
                <p className="ltr">(x+2)/(x+1)</p>
                <br />
                <p>يجب تحديد الحد داخل الجذر بأقواس </p>
                <p>مثال:</p>
                <p>جذر المقدار x + 1 يكتب:</p>
                <p>(x+1)√</p>
              </div>
            );
          }}
        />
      </div>

      <div className="main-form fade-in fade-in-2 max-sm:flex-row">
        <h2 className="mb-[10px]">العدد:</h2>
        <div className="flex gap-[10px] ">
          <div className="main-input">
            <input dir="ltr" ref={functionRef} />
            <div></div>
          </div>
          <h2>
            <InlineMath>:z</InlineMath>
          </h2>
        </div>
      </div>
      <div className="shortcuts fade-in fade-in-3">
        <button
          onClick={() => {
            functionRef.current.value = functionRef.current.value + "²";
            functionRef.current.focus();
          }}
        >
          ²
        </button>
        <button
          onClick={() => {
            functionRef.current.value = functionRef.current.value + "³";
            functionRef.current.focus();
          }}
        >
          ³
        </button>
        <button
          onClick={() => {
            functionRef.current.value = functionRef.current.value + "√";
            functionRef.current.focus();
          }}
        >
          √
        </button>
        <button
          onClick={() => {
            functionRef.current.value = functionRef.current.value + "π";
            functionRef.current.focus();
          }}
        >
          π
        </button>
      </div>
      <div className="mt-[10px] relative w-48 fade-in fade-in-3" dir="rtl">
        <div className="text-gray-700 mb-1">تحويل إلى:</div>
        <div
          className="custom-select-wrapper bg-white border border-gray-300 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-800">{selectedOption}</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                    selectedOption === option
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedOption(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <a dir="ltr" href="#function-changes-response">
        <button
          className={`generate gradient fade-in fade-in-4 `}
          onClick={() => {
            if (!functionRef.current.value.length == 0) {
              setFunc(functionRef.current.value);
              setRequestAgain(requestAgain + 1);
            }
          }}
        >
          {requestAgain ? "reGenerate" : "Generate"}
        </button>
      </a>

      {requestAgain ? (
        loading ? (
          <div>
            {" "}
            <div id="function-changes-response" className="loading">
              <div className="short"></div>
              <div></div>
              <div></div>
              <div className="short"></div>
              <div></div>
              <div></div>
              <div className="short"></div>
              <div></div>
              <div></div>
              <div className="short"></div>
              <div></div>
              <div></div>
              <div className="short"></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : data ? (
          <div className="response mt-[100px]">
            <p>إذا كان الجواب غير واضح أو فيه رموز غريبة جرب إعادة المحاولة</p>
            <br />
            {parseResponse(data)}
          </div>
        ) : (
          <div className="mt-[20px]">حدث خطأ, يرجى المحاولة لاحقا</div>
        )
      ) : null}
    </div>
  );
};
