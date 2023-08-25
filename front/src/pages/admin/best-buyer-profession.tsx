import DateRangePicker from "@/components/DateRangePicker";
import { PageTitle } from "@/components/Text";
import { fetchClient, fetchServer } from "@/services/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";

type Response = {
  profession: string;
  earnings: number;
};

export const getServerSideProps: GetServerSideProps<{
  bestProfession: Response;
}> = async (context) => {
  // get date 30 days ago
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const query = new URLSearchParams({
    start: date.toISOString(),
    end: new Date().toISOString(),
  });

  const res = await fetchServer(
    `/admin/best-buyer-profession?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    context
  );

  const data = await res.json();

  return {
    props: {
      bestProfession: data,
    },
  };
};

const BestBuyerProfession = ({
  bestProfession,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [response, setResponse] = useState<Response>();

  const handleSubmit = async (start: Date, end: Date) => {
    const query = new URLSearchParams({
      start: start.toISOString(),
      end: end.toISOString(),
    });

    const res = await fetchClient(
      `/admin/best-buyer-profession?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 200) {
      const error = await res.json();
      alert(error.message || "Unknown error");
      return;
    }

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <PageTitle>Best buyer profession</PageTitle>

      <DateRangePicker
        onClear={() => {
          setResponse(undefined);
        }}
        onSubmit={(start, end) => {
          handleSubmit(start, end);
        }}
      />

      <PageTitle className="mt-5 text-lg mb-0">Results</PageTitle>
      {!response && <p className="text-small mb-3">Latest 30 days</p>}

      <div className="flex flex-col gap-2">
        <p className="text-lg">
          Best profession: {response?.profession || bestProfession.profession}
        </p>
        <p className="mb-5">
          Earnings:{" "}
          {response?.earnings?.toFixed(2) || bestProfession.earnings.toFixed(2)}
          €
        </p>
      </div>
    </div>
  );
};

export default BestBuyerProfession;
