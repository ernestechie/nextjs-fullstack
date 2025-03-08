"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function VerificationPage() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    console.log("Token -> ", token);
  }, [params]);

  return (
    <div>
      <p>Verification Page</p>
    </div>
  );
}
