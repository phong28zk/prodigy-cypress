"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "../../../../public/cypresslogo.svg";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { FormSchema } from "@/lib/types";

const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .describe("Email")
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .describe("Password")
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "bg-green-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    []
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({email, password}: z.infer<typeof FormSchema>) => {
    const 
  };

  const signUpHandler = () => {};

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(
          "w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
        )}
      >
        <Link href="/" className="w-full flex justify-left items-center">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-brand-primaryBlue dark:text-brand-primaryPurple ml-2">
            Cypress
          </span>
        </Link>

        <FormDescription className="text-foreground/60">
          All in one Collab and Productivity
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Enter your email" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="confirmPassword"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your confirm password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!confirmation && !codeExchangeError && (
          <>
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? "Create Account" : <Loader />}
            </Button>
          </>
        )}
        {submitError && <FormMessage>{submitError}</FormMessage>}
        {/* <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="w-full bg-brand-primaryBlue hover:bg-brand-primaryPurple text-white font-bold py-2 px-4 rounded"
        >
          {!isLoading ? "Login" : <Loader />}
        </Button> */}
        <span className="self-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-primaryBlue dark:text-brand-primaryPurple"
          >
            Login
          </Link>
        </span>
        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className="w-6 h-6 mr-2" />}
              <AlertTitle>
                {codeExchangeError || "Please check your email for a link"}
              </AlertTitle>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default SignUp;
