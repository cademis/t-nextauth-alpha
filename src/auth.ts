import NextAuth, { type User } from "next-auth";
import authConfig from "~/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import { getUserById } from "~/data/user";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role?: UserRole;
    } & User;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
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
