"use client";

import { throwAxiosError } from "@/helpers/toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ passwordConfirm: "", password: "" });

  const { passwordConfirm, password } = user;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Call reset-passwprd endpoint

      toast.success("Password Reset Successful!");
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
        <h1 className="mb-4 font-bold text-xl">Reset Password</h1>
        <hr />
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>
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
