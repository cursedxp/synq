"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ResendVerification() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email: session?.user?.email }),
    });
    const data = await response.json();
    console.log(data);
    setResponse(data);
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Resend Verification
        </button>
        {response?.status === 200 && (
          <p className="text-green-500">{response.message}</p>
        )}
        {response?.status !== 200 && (
          <p className="text-red-500">{response?.message}</p>
        )}
      </form>
    </div>
  );
}
