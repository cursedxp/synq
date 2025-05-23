import { useState } from "react";
import { SignupSchema } from "../schemas/signUp/signup.schema";

export function useRegistration() {
  // Define state variables
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Define signUp function
  const signUp = async (formData: SignupSchema) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      setSuccess(true);
      return data;
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, error, loading, success };
}
