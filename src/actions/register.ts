"use server";

import { type RegisterFormSchema, registerFormSchema } from "~/schemas";

export const register = async (values: RegisterFormSchema) => {
  const validatedSchema = registerFormSchema.safeParse(values);

  if (!validatedSchema.success) {
    return { error: "Invalid Fields" };
  } else {
    return {
      success:
        "You're all set! While we review your details, feel free to explore our demo projects. We'll be in touch soon!",
    };
  }
};
