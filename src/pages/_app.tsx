import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { chains } from "../lib/chains";

const connectors = [new InjectedConnector({ chains: chains })];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
