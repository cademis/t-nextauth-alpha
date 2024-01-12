import { z } from "zod";

export const resetFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type ResetFormSchema = z.infer<typeof resetFormSchema>;
