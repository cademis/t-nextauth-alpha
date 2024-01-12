"use server";

import { getUserByEmail } from "~/data/user";
import { sendPasswordResetEmail } from "~/lib/mail";
import { generatePasswordResetToken } from "~/lib/tokens";
import {
  type ResetFormSchema,
  resetFormSchema,
} from "~/schemas/reset-form.schema";

export const reset = async (values: ResetFormSchema) => {
  const validatedFields = resetFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid form data.",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "No user found with that email address.",
    };
  }

  //TODO: generate token and reset email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "Reset email sent.",
  };
};
