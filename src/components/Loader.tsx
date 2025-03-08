import React from "react";
import { CgSpinner } from "react-icons/cg";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <CgSpinner className="animate-spin" size={60} />
    </div>
  );
}
