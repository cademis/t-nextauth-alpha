"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "~/_components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LoginFormSchema,
  loginFormSchema,
} from "~/schemas/login-form.schema";

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
import { login } from "~/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  if (searchParams.get("error") === "OAuthAccountNotLinked")
    console.log("Error caught: ", searchParams.get("error"));

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider. Please login with another provider."
      : "";

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "example@email.com",
      password: "pass1234",
    },
  });

  const onSubmit = (values: LoginFormSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
            return;
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
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
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
