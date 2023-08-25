import { Button, Input } from "@/components/Form";
import { Title } from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Register() {
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
    console.log("register");

    setError("Email o contraseña incorrectos");
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
          <Title>Create an account</Title>
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
                console.log(response);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />

            <div>
              <Button type="submit">Register</Button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
