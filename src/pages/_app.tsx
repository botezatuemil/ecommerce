import type { AppProps } from "next/app";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import {
  RecoilRoot,
} from "recoil";
import Footer from "./Footer";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const route = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
        {route.pathname !== "/login" && <Footer/>}
      </RecoilRoot>
    </QueryClientProvider>
  );
}
