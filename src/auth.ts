import NextAuth from "next-auth";
import authConfig from "~/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import { getUserById } from "~/data/user";
import type { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "~/data/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log({ user, account });
      // Allow OAuth without email verification

      if (account?.provider !== "credentials") return true;

      //prevent login if email is not verified
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      //TODO: Add 2FA check
      if (existingUser?.isTwoFactorEnabled) {
        //get 2 factor confirmation
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        //delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

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
