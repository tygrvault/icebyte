import "../styles/globals.css";

import { ThemeProvider } from "next-themes";
import Nav from "@/components/nav";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/components/auth/context";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Toaster theme="dark" className="h-full min-h-[50px]" />
        <AuthProvider>
          <Nav />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
