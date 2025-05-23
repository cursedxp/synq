import { useState } from "react";

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  status: number;
}

export function useForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ForgotPasswordResponse = await response.json();

      if (!data.success) {
        setError(data.message);
        return null;
      }

      setSuccess(true);
      return data;
    } catch {
      setError("Error sending password reset email");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, error, loading, success };
}
