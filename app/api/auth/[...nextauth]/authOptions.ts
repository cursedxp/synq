import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { DefaultSession } from "next-auth";
import { AuthOptions } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    // Credentials provider for email/password login
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          const account = await prisma.account.findUnique({
            where: { email: credentials.email },
          });

          if (!account) {
            throw new Error("Invalid email or password");
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            account.password
          );

          if (!passwordsMatch) {
            throw new Error("Invalid email or password");
          }

          return account;
        } catch {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: { signIn: "/auth/signin", signOut: "/auth/signout" },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // JWT callback to add account ID to the token
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};
