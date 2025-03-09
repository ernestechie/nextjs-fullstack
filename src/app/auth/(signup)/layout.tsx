"use client";

import Link from "next/link";
import React from "react";

export default function AuthLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-16 mx-auto max-w-5xl">
      <div className="flex items-center justify-center gap-8 max-w-sm mx-auto">
        <Link href="/auth/signup" className="btn bg-gray-500">
          Credentials Signup
        </Link>
        <Link href="/auth/signup-passwordless" className="btn bg-gray-500">
          Otp Signup
        </Link>
      </div>

      <div className="py-8">{children}</div>
    </section>
  );
}
