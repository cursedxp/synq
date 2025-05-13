import { useState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";

interface SignInCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (credentials: SignInCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await nextAuthSignIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return result;
      }

      return result;
    } catch {
      // Konsolda hata göstermeden sessizce geçiyoruz
      setError("Invalid email or password");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, signIn };
};
