import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";

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
    <NextUIProvider>
      <SessionProvider session={session}>
        <Render />
      </SessionProvider>
    </NextUIProvider>
  );
}
