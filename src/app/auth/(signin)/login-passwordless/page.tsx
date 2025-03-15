"use client";

import { throwAxiosError } from "@/helpers/toast";
import httpClient from "@/lib/api/axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function PasswordlessLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Call signin endpoint
      const response = await httpClient.post("/auth/passwordless/login", {
        email,
      });
      if (!response.status) console.error("Response -> ", response);

      setEmail("");

      router.push("/auth/verify-otp");
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
        <h1 className="mb-4 font-bold text-xl">OTP Login</h1>
        <hr />
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" title="Login Button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <div className="mt-4 flex items-center justify-end gap-2">
            <span>Don`t have an account?</span>
            <Link href="/auth/signup" className="font-medium text-blue-700">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
