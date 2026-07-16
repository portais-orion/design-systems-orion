import React from "react";

export function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center rounded-xl border border-border bg-background mt-4 mb-4">
      <div className="w-full max-w-3xl flex justify-center">
        {children}
      </div>
    </div>
  );
}
