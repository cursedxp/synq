import NextAuth from "next-auth";
import { authOptions } from "./authOptions";
import { AuthOptions } from "next-auth";

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
