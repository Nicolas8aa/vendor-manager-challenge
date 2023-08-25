import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input } from "@/components/Form";
import { Title } from "@/components/Text";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      // redirect to callbackUrl if present or to the default page
      const callbackUrl = router.query.callbackUrl as string;
      router.replace(callbackUrl || "/");
      return;
    }

    setError("Email or password incorrect");
  };

  if (session) {
    router.replace("/");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="https://tailwindui.com/img/logos/mark.svg"
            width={48}
            height={48}
            alt="Your Company"
          />
          <Title>Sign in to your account</Title>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <div className="text-center text-red-500">{error}</div>}
          <form
            className="space-y-6"
            method="POST"
            onSubmit={async (event) => {
              event.preventDefault();
              const { email, password } =
                event.target as typeof event.target & {
                  email: { value: string };
                  password: { value: string };
                };

              try {
                let response = await handleSubmit({
                  email: email.value,
                  password: password.value,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              onFocus={() => setError("")}
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
              onFocus={() => setError("")}
            />

            <div>
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
