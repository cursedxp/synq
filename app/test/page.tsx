"use client";

import CheckBox from "@/app/components/auth/common/checkBox/checkbox";

export default function TestPage() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1>This is TestPage</h1>
      <CheckBox label="Your label here" />
    </div>
  );
}
