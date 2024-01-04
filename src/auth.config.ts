import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "~/schemas/login-form.schema";
import { getUserByEmail } from "~/data/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
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
