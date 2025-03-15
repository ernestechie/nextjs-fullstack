"use client";

import { throwAxiosError } from "@/helpers/toast";
import axios from "axios";

import React from "react";
import toast from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    await axios
      .get("/api/auth/logout")
      .then((res) => {
        toast.success(res.data?.message);
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1000);
      })
      .catch((err) => throwAxiosError(err));
  };
  return (
    <section className="p-16 mx-auto max-w-5xl">
      {children}
      <div className="mt-8">
        <button className="btn bg-red-500" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
}
