import { loginFormSchema } from "~/schema/register-form.schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginFormSchema).query(({ input }) => {
    console.log("login trpc procedure", input);
    return input.email;
  }),
});
