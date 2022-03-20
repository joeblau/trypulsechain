import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { chains } from "../lib/chains";
// import { getDefaultProvider, providers } from "ethers";
// import { defaultChains } from "wagmi";
// type ProviderConfig = {
//   chainId?: number;
// };

const connectors = [new InjectedConnector({ chains: chains })];

// const provider = ({ chainId }: ProviderConfig) => {
//   const chain = defaultChains.find((c) => c.id === chainId);
//   if (chain) {
//     return new providers.InfuraProvider(chainId, process.env.INFURA_API_KEY);
//   }

//   return providers.getDefaultProvider(chainId);
// };

// const provider = getDefaultProvider("homestead", {
//   etherscan: process.env.ETHERSCAN_API_KEY,
//   infura: process.env.INFURA_API_KEY,
//   alchemy: process.env.ALCHEMY_API_KEY,
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider connectors={connectors} autoConnect>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
