import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, PreviewData } from "next";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

const fetcher = async (
  path: string,
  options: RequestInit,
  session: Session | null
) => {
  return fetch(`http://localhost:3001${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { "x-access-token": session.user.accessToken }),
    },
  });
};

export const fetchClient = async (path: string, options: RequestInit) => {
  const session = await getSession();

  return fetcher(path, options, session);
};

export const fetchServer = async (
  path: string,
  options: RequestInit,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  return fetcher(path, options, session);
};
