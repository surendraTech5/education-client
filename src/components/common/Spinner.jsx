import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-[150px] w-full">
      <div className="w-15 h-15 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
