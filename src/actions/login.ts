"use server";

import { AuthError } from "next-auth";
import { signIn } from "~/auth";
import { getUserByEmail } from "~/data/user";
import { sendTwoFactorTokenEmail } from "~/lib/mail";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "~/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "~/schemas/login-form.schema";

export const login = async (values: LoginFormSchema) => {
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser?.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    console.log({ verificationToken });
    return { success: "Confirmation Email Sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //TODO: Verify code
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An unknown error occurred" };
      }
    }
    throw error;
  }
};
