"use server";

import {
  loginFormSchema,
  type LoginFormSchema,
} from "~/schemas/login-form.schema";

export const login = async (values: LoginFormSchema) => {
  const validatedSchema = loginFormSchema.safeParse(values);

  if (!validatedSchema.success) {
    return { error: "Invalid Fields" };
  } else {
    return { success: "email sent" };
  }
};
