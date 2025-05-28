import { useState } from "react";
import { Response } from "@/app/api/types/types";

export function useEmailTokenVerify() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const verifyToken = async (token: string) => {
    // Check if token is provided
    if (!token) {
      setError("Token is required");
      return null;
    }

    setLoading(true);
    setError(null);

    // Verify token
    try {
      const response = await fetch(`/api/auth/email/verify?token=${token}`, {
        method: "POST",
      });

      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`);
        return null;
      }

      const data: Response = await response.json();

      if (!data.success) {
        setError(data.message);
        return null;
      }

      setSuccess(true);
      return data;
    } catch {
      setError("Error verifying the token");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { verifyToken, success, error, loading };
}
