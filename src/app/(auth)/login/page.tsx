"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";

import Logo from "../../../../public/cypresslogo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { actionLoginUser } from "@/lib/server-action/auth-actions";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if ( error ) { 
      form.reset();
      setSubmitError(error.message);
    }
    router.push("/dashboard");

    // try {
    //   await actionLoginUser(formData);
    //   router.push("/dashboard");
    // } catch (error) {
    //   form.reset();
    //   setSubmitError("Invalid email or password");
    // }
    
  };

  return (
    <>
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) {
              setSubmitError("");
            }
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
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
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    type="email"
                  />
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
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full bg-brand-primaryBlue hover:bg-brand-primaryPurple text-white font-bold py-2 px-4 rounded"
          >
            {!isLoading ? "Login" : <Loader />}
          </Button>
          <span className="self-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-brand-primaryBlue dark:text-brand-primaryPurple"
            >
              Register
            </Link>
          </span>
        </form>
      </Form>
    </>
  );
};

export default LoginPage;
