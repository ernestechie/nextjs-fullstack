"use client";

import React, { useEffect, useState } from "react";

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  const [generatedError, setGeneratedError] = useState("");

  useEffect(() => {
    if (error) {
      console.log("ERROR_BOUNDARY -> ", error);
      setGeneratedError(error.message);
    }
  }, [error]);

  return (
    <div className="p-8 py-16 rounded-xl bg-gray-100 flex flex-col items-center justify-end gap-4">
      <p className="text-2xl">{generatedError || "Something went wrong"}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="max-w-32 bg-gray-600"
      >
        Try again
      </button>
    </div>
  );
}
