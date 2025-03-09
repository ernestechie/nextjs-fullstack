"use client";

import { LS_CHATFUSION_USER } from "@/constants/auth";
import { throwAxiosError } from "@/helpers/toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PasswordlessSignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userExists = localStorage.getItem(LS_CHATFUSION_USER);

      if (!userExists) router.replace("/auth/signup-passwordless");
      if (userExists) setEmail(userExists as string);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Call signup endpoint
      const response = await axios.post("/api/auth/passwordless/verify-otp", {
        email,
        otp,
      });
      if (!response.status) console.error("Response -> ", response);
      else {
        toast.success("Welcome");

        setTimeout(() => {
          setOtp("");
          setEmail("");

          router.push("/app");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      throwAxiosError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-2 py-16 min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="mb-8 py-4">
          <h1 className="mb-4 font-bold text-xl">Welcome, {email} </h1>
          <p>Input 6 digit code sent to your email</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <input
              type="number"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              max={999999}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>

          <div className="mt-4 flex items-center justify-end gap-2">
            <span>Already have an account?</span>
            <Link href="/auth/login" className="font-medium text-blue-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
