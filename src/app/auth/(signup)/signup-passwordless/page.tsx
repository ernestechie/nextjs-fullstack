"use client";

import { LS_CHATFUSION_USER } from "@/constants/auth";
import { throwAxiosError } from "@/helpers/toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function PasswordlessSignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "", username: "" });

  const { email, username } = user;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Call signup endpoint
      const response = await axios.post(
        "/api/auth/passwordless/register",
        user
      );

      if (!response.status) console.error("Response -> ", response);

      setUser({ email: "", username: "" });

      localStorage.setItem(LS_CHATFUSION_USER, email);

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
        <h1 className="mb-8 font-bold text-xl">Signup | OTP</h1>
        <hr />
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
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
