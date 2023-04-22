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
        <Toaster position="bottom-right" className="hidden sm:block" />
        <Toaster position="top-center" className="block sm:hidden" />
        <AuthProvider>
          <Nav />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
