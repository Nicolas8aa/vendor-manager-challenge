import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { PageTitle, Title } from "@/components/Text";

export default function Home() {
  // create a home page to introduce the app

  const { data: session } = useSession();

  const user = session?.user;

  return (
    <>
      <PageTitle>Home</PageTitle>
      {user && (
        <>
          <h1>
            Welcome {user.firstName} {user.lastName}!{" "}
          </h1>
          <p>
            You are logged in as {user.email} and have the role of {user.type}{" "}
          </p>

          {user.admin && <h1 className="font-bold text-indigo-600">Admin</h1>}
        </>
      )}
    </>
  );
}
