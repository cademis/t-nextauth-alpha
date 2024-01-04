"use server";

import { type RegisterFormSchema, registerFormSchema } from "~/schemas";

import bcrypt from "bcrypt";
import { db } from "~/server/db";
import { getUserByEmail } from "~/data/user";

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

    //TODO: Send verification token email

    return {
      success:
        "You're all set! While we review your details, feel free to explore our demo projects. We'll be in touch soon!",
    };
  }
};
