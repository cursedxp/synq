import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

export default NextAuth({
  providers: [
    // Credentials provider
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Check if credentials are provided
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Find user by email
          const user = await prisma.account.findUnique({
            where: { email: credentials.email },
          });

          // Check if user exists
          if (!user) return null;

          // Check if email is verified
          // if (!user.emailVerified) {
          //   throw new Error("Please verify your email before logging in.");
          // }

          // Check if password matches
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // Return user if password matches, otherwise return null
          return passwordsMatch ? user : null;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Create token with user id
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    // Create session with user id
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
