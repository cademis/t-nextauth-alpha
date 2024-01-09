import Credentials from "next-auth/providers/credentials";

import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "~/schemas/login-form.schema";
import { getUserByEmail } from "~/data/user";

import bcrypt from "bcryptjs";
import { env } from "~/env";

export default {
  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user?.password) return null; // check if user exists and has a password

          const passWordsMatch = await bcrypt.compare(password, user.password);

          if (passWordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
