import { Button, Input } from "@/components/Form";
import { fetchClient, fetchServer } from "@/services/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: GetServerSideProps<{
  balance: number;
}> = async (context) => {
  const res = await fetchServer("/balances/balance", {}, context);

  const data = await res.json();

  return {
    props: { balance: data.balance },
  };
};

const Balance = ({
  balance,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data: session } = useSession();

  const handleSubmit = async ({ amount }: { amount: number }) => {
    const res = await fetchClient(`/balances/deposit/${session?.user.id}`, {
      method: "POST",
      body: JSON.stringify({
        amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      alert("Money deposited");
      router.replace(router.asPath);
    } else {
      const error = await res.json();
      alert("Error depositing money: " + error?.message || "Unknown error");
    }
  };

  return (
    // create a page to display the user's balance. Fetch data from the /balances API. and a button to deposit money
    <div className="max-w-sm mx-auto text-center">
      <p className="text-4xl mb-5">Balance: {balance.toFixed(2)}€</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { amount } = e.target as typeof e.target & {
            amount: { value: number };
          };
          handleSubmit({ amount: amount.value });
        }}
        className="flex flex-col gap-4"
      >
        <Input
          type="number"
          name="amount"
          label="Top up account"
          placeholder="100"
          className="my-4"
        />
        <Button>Deposit</Button>
      </form>
    </div>
  );
};

export default Balance;
