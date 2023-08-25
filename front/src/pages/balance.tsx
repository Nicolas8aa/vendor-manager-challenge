import { fetchServer } from "@/services/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const res = await fetchServer("/submissions/unpaid", {}, context);

  return {
    props: {},
  };
};

const balance = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  return <h1>Balance</h1>;
};

export default balance;
