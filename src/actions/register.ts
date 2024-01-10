"use server";

import { type RegisterFormSchema, registerFormSchema } from "~/schemas";

import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { getUserByEmail } from "~/data/user";
import { generateVerificationToken } from "~/lib/tokens";

export const register = async (values: RegisterFormSchema) => {
  const validatedSchema = registerFormSchema.safeParse(values);

  if (!validatedSchema.success) {
    return { error: "Invalid Fields" };
  } else {
    const { email, password } = validatedSchema.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already exists" };
    }

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    //TODO: Send verification token email

    return {
      success:
        "Confirmation email sent! Feel free to browse the demo projects while your account is being verified.",
    };
  }
};
