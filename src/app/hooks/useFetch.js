"use client";
import { useState, useCallback } from "react";

import Cerebras from "@cerebras/cerebras_cloud_sdk";

const client = new Cerebras({
  apiKey: "csk-3r368e4xwdf44whv2epxntc3mpvf8fpeytj84dvvd3d6f8r2", // This is the default and can be omitted
});
// csk-6v2ch4c3mttnm9fyc32r5hh982w8pf2rj6xt4ycnw9n5cxc2
// csk-3yw2vv94m8kh9xywkrvrkt6ep4fc52ywvf3dtw3pev62v3m3
// export function useFetch(maxRetries = 5, initialDelay = 1000) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = useCallback(
//     async (query, retries = maxRetries, delay = initialDelay) => {
//       if (!query) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await ai.models.generateContent({
//           model: "gemini-2.5-flash-lite",
//           contents: query,
//         });
//         setLoading(false);
//         setData(response.text);
//       } catch (err) {
//         console.log("Error caught:", err);

//         // Check for 503 error - you might need to adjust this based on the actual error structure
//         const isRetryableError =
//           err?.message?.includes("503") ||
//           err?.code?.includes("503") ||
//           err?.status === 503 ||
//           err?.name?.includes("503") ||
//           err?.toString().includes("503");

//         if (isRetryableError && retries > 0) {
//           console.log(
//             `503 error detected. Retrying in ${delay}ms... (${retries} retries left)`
//           );

//           // Wait before retrying
//           await new Promise((resolve) => setTimeout(resolve, delay));

//           // Retry with decreased retry count and increased delay
//           return fetchData(query, retries - 1, delay * 2);
//         } else {
//           // No more retries or non-retryable error
//           setLoading(false);
//           setError(err);
//         }
//       }
//     },
//     [maxRetries, initialDelay]
//   );

//   return { data, loading, error, fetchData };
// }

export function useFetch(maxRetries = 5, initialDelay = 1000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (query, retries = maxRetries, delay = initialDelay) => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await client.chat.completions.create({
          messages: [{ role: "user", content: query }],
          model: "qwen-3-235b-a22b-instruct-2507",
        });
        setLoading(false);
        setData(response.choices[0].message.content);
      } catch (err) {
        console.log("Error caught:", err);

        // Check for 503 error - you might need to adjust this based on the actual error structure
        const isRetryableError =
          err?.message?.includes("503") ||
          err?.code?.includes("503") ||
          err?.status === 503 ||
          err?.name?.includes("503") ||
          err?.toString().includes("503");

        if (isRetryableError && retries > 0) {
          console.log(
            `503 error detected. Retrying in ${delay}ms... (${retries} retries left)`
          );

          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, delay));

          // Retry with decreased retry count and increased delay
          return fetchData(query, retries - 1, delay * 2);
        } else {
          // No more retries or non-retryable error
          setLoading(false);
          setError(err);
        }
      }
    },
    [maxRetries, initialDelay]
  );

  return { data, loading, error, fetchData };
}
