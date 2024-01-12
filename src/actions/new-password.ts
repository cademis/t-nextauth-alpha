"use server";

import { getPasswordResetTokenByToken } from "~/data/password-reset-token";
import { getUserByEmail } from "~/data/user";
import { NewPasswordFormSchema, newPasswordFormSchema } from "~/schemas";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: NewPasswordFormSchema,
  token: string | null,
) => {
  if (!token) {
    return {
      error: "Missing token.",
    };
  }

  const validatedFields = newPasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid form data.",
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token.",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token expired.",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email does not exist",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Password updated.",
  };
};
