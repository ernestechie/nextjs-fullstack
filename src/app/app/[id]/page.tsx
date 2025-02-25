/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-lg">Profile Page {params.id}</p>
    </div>
  );
}
