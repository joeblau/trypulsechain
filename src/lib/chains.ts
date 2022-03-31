import { defaultChains, Chain } from "wagmi";

const pulseChainTestnet: Chain = {
  id: 941,
  name: "Pulse Chain Testnet v2b",
  nativeCurrency: {
    name: "Test Pulse",
    symbol: "tPLS",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.v2b.testnet.pulsechain.com"],
  blockExplorers: [
    {
      name: "Pulse Chain Scan v2b",
      url: "https://scan.v2b.testnet.pulsechain.com",
    },
  ],
  testnet: true,
};

export const chains = [...defaultChains, pulseChainTestnet];
