/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/components/Loader";
import axios from "axios";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerificationPage() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = params.get("token");

    async function verifyAccount() {
      try {
        const apiRes = await axios.post("/api/auth/verify-email", {
          token,
        });

        setMessage(apiRes.data.message);
        const data = await apiRes.data;
        if (data.status) setVerified(true);
      } catch (err: any) {
        console.log(err);
        const error =
          err?.response?.data?.message || "Unexpected error occured";

        setMessage(error);
      } finally {
        setIsLoading(false);
      }
    }

    verifyAccount();
  }, [params]);

  return (
    <section className="p-2 py-16 min-h-screen">
      <div className="flex flex-col items-center justify-center w-full mx-auto max-w-xl">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full text-2xl p-8 bg-gray-200 rounded-xl">
            <p>{message}</p>
            <div className="mt-8">
              <Link href={verified ? "/app" : "/auth/signup"}>
                <button
                  type="button"
                  className={`btn ${!verified && "bg-gray-600"}`}
                >
                  {verified ? "Go to dashboard" : "Create Account"}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
