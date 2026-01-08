"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { signInSchema, signUpSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSignUp = type === "sign-up";

  const form = useForm<SignUpFormValues | SignInFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: isSignUp
      ? {
          firstName: "",
          lastName: "",
          address1: "",
          city: "",
          state: "",
          postalCode: "",
          dateOfBirth: "",
          ssn: "",
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        },
  });

  useEffect(() => {
    if (isSignUp) {
      form.reset({
        firstName: "",
        lastName: "",
        address1: "",
        city: "",
        state: "",
        postalCode: "",
        dateOfBirth: "",
        ssn: "",
        email: "",
        password: "",
      });
    } else {
      form.reset({
        email: "",
        password: "",
      });
    }

    setErrorMessage(null);
    setUser(null);
  }, [type]);

  // 2. Define a submit handler.
  const onSubmit = async (
    data: SignUpFormValues | SignInFormValues
  ) => {
    console.log("SUBMIT DATA:", data); // Debug log
    setIsLoading(true);
    setErrorMessage(null);
    try {
        //Sign up with Appwrite & create plain link token

        if(type === 'sign-up'){
        const signUpData = data as SignUpFormValues;

        const userData = {
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          address1: signUpData.address1,
          city: signUpData.city,
          state: signUpData.state,
          postalCode: signUpData.postalCode,
          dateOfBirth: signUpData.dateOfBirth,
          ssn: signUpData.ssn,
          email: signUpData.email,
          password: signUpData.password,
        }
          const response = await signUp(userData);

          if (response?.error) {
            setErrorMessage(response.error);
            setIsLoading(false);
            return;
          }

          if (!response) {
            setErrorMessage("Email already exists");
            setIsLoading(false);
            return;
          }

          setUser(response);
        }

        

        if (type === "sign-in") {
          const response = await signIn({
            email: data.email,
            password: data.password,
          });

          if (!response) {
            setErrorMessage("Invalid email or password");
            setIsLoading(false);
            return;
          }

          router.replace("/");
        }
    } catch (error) {
        console.log(error)
    } finally{
        setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.png"
            width={34}
            height={34}
            alt="Wealthix logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            WealthiX
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Account Create Successfully" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
          </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            { type === 'sign-up' && (
                <>
                <div className="flex gap-4">
                <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                </div>
                <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                <div className="flex gap-4">
                <CustomInput control={form.control} name="state" label="State(US)" placeholder="ex: NY, CA, PA, MO, PA" />
                <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="ex: 11100" />
                </div>
                <div className="flex gap-4">
                <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                <CustomInput control={form.control} name="ssn" label="NIC" placeholder="NIC must be 9 digits" />
                </div>
                </>
            )}

              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

            {errorMessage && (
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2">
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading}
                className="form-btn">
                {isLoading ? (
                    <>
                    <Loader2 size={20} className="animate-spin"/>&nbsp;
                    Loading...
                    </>
                ): type === 'sign-in'
                    ? 'Sign In' : 'Sign Up'}
               </Button>
            </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
                {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"
                }
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
            {type === 'sign-in' ? 'Sign-up' : 'Sign-in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
