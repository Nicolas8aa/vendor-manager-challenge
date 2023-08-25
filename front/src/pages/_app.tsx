import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import Head from "next/head";

const noLayout = ["/auth/login", "/auth/register"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...props
}: AppProps) {
  const Render = () => {
    if (noLayout.includes(props.router.pathname)) {
      return <Component {...pageProps} />;
    }

    return <Layout>{<Component {...pageProps} />}</Layout>;
  };

  return (
    <>
      <Head>
        <title>Vendor manager</title>
      </Head>
      <NextUIProvider>
        <SessionProvider session={session}>
          <Render />
        </SessionProvider>
      </NextUIProvider>
    </>
  );
}
