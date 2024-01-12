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
import {
  resetFormSchema,
  type ResetFormSchema,
} from "~/schemas/reset-form.schema";
import { reset } from "~/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetFormSchema>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: "example@email.com",
    },
  });

  const onSubmit = (values: ResetFormSchema) => {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      reset(values)
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
      headerLabel="Forgot your password? "
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
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
