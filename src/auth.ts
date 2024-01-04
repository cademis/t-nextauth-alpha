import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "~/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import { getUserById } from "~/data/user";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      console.log({ session });

      return session;
    },
    async jwt({ token }) {
      console.log(token);
      if (!token.sub) return token; //logged in check
      const existingUser = await getUserById(token.sub);
      console.log({ existingUser });

      //option2
      if (!existingUser) return token;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
