"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "~/_components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/_components/ui/form";
import { Input } from "~/_components/ui/input";
import { Button } from "~/_components/ui/button";
import { FormError } from "~/_components/form-error";
import { FormSuccess } from "~/_components/form-success";
import { useState, useTransition } from "react";
import { type RegisterFormSchema, registerFormSchema } from "~/schemas";
import { register } from "~/actions/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "example@email.com",
      password: "pass1234",
    },
  });

  const onSubmit = (data: RegisterFormSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      void register(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Login here."
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="johndoe@email.com"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSuccess message={success} />

          {!success && <FormError message={error} />}
          <Button disabled={isPending} type="submit">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
