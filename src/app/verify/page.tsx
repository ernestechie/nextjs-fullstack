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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = params.get("token");

    async function verifyAccount() {
      try {
        const apiRes = await axios.post("/api/auth/verify-email", {
          token,
        });

        setMessage(apiRes.data.message);
        const data = await apiRes.data;
        if (data.status) setSuccess(true);
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
            <p className="">{message}</p>

            {success && (
              <div className="mt-8">
                <Link href="/app">
                  <button type="button" className="btn">
                    Go to dashboard
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
