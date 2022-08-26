import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { pulseChainTestnet } from "../lib/chainConfig";
import { ThemeProvider } from "next-themes";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, provider } = configureChains(
  [pulseChainTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: "https://rpc.v2b.testnet.pulsechain.com",
      }),
    }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains: chains })],
  provider: provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;
