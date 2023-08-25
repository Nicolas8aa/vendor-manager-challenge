import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input } from "@/components/Form";
import { Title } from "@/components/Text";
import Link from "next/link";

export default function Home() {
  // create a home page to introduce the app

  const { data: session } = useSession();

  console.log({ session });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Title>Home</Title>
        {session ? <h1>Logged in</h1> : <h1>Not logged in</h1>}
      </div>
    </>
  );
}
