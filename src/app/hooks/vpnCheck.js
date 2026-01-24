"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function checkVPN() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  useEffect(() => {
    const fetchGeoInfo = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org");
        const ip = await ipResponse.text();

        const geoResponse = await fetch(
          `https://free.freeipapi.com/api/json/${ip}`
        );
        const geoInfo = await geoResponse.json();
        if (geoInfo.countryCode === "SY") {
          setIsBlocked(true);
        }
      } catch (error) {
        setIsBlocked(false);
      } finally {
        setLoading(false);
      }
    };
    fetchGeoInfo();
  }, []);

  useEffect(() => {
    // Only redirect when loading is complete AND country is blocked
    if (!loading && isBlocked) {
      router.push("/vpn-required");
    } else {
      router.push("/services");
    }
  }, [loading, isBlocked, router]);
  return { loading, isBlocked };
}
