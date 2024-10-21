"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import FormSuccess from "./ui/form-success";
import FormError from "./ui/form-error";
import { settingsSchema } from "@/schemas";
import { settings } from "../../actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

const SettingsForm = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | "">("");
  const [isSuccess, setSuccess] = useState<string | "">("");

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: user?.username || undefined,
      phoneNumber: user?.phoneNumber || undefined,
      bikeNumber: user?.bikeNumber || undefined,
      stage: user?.stage || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    setError(""), setSuccess("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Oops! An error occurred."));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <h2 className="text-2xl font-bold titlecase leading-[48px]">
          Update Info
        </h2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bikeNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bike Number</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder=""
                  style={{ textTransform: "uppercase" }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSuccess message={isSuccess} />
        <FormError message={error} />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-bhgreen "
        >
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
