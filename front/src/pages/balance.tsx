import { fetchServer } from "@/services/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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

const balance = ({
  balance,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <h1 className="text-2xl font-bold">Balance: {balance}</h1>;
};

export default balance;
