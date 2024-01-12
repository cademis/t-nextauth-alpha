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
import { NewPasswordFormSchema, newPasswordFormSchema } from "~/schemas";
import { useSearchParams } from "next/navigation";
import { newPassword } from "~/actions/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordFormSchema>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: NewPasswordFormSchema) => {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
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
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    placeholder="******"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit">
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
