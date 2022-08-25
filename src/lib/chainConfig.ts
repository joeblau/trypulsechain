import { Chain } from "wagmi";

export const pulseChainTestnet: Chain = {
  id: 941,
  name: "Pulse Chain Testnet v2b",
  network: "PulseChain",
  nativeCurrency: {
    name: "Test Pulse",
    symbol: "tPLS",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://rpc.v2b.testnet.pulsechain.com",
  },
  blockExplorers: {
    default: {
      name: "Pulse Chain Scan v2b",
      url: "https://scan.v2b.testnet.pulsechain.com",
    },
  },
  testnet: true,
};
