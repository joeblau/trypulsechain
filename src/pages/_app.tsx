import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { chains } from "../lib/chains";
import { getDefaultProvider, providers } from "ethers";
type ProviderConfig = {
  chainId?: number;
};

const PULSE_CHAIN_RPC = "https://rpc.v2b.testnet.pulsechain.com";

const connectors = [new InjectedConnector({ chains: chains })];

const provider = ({ chainId }: ProviderConfig) => {
  if (chainId === 941) {
    return new providers.JsonRpcProvider(PULSE_CHAIN_RPC);
  }
  return new providers.InfuraProvider(
    chainId,
    process.env.NEXT_PUBLIC_INFURA_API_KEY
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider connectors={connectors} provider={provider} autoConnect>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
