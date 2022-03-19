const pulseChainTestNet = {
  chainId: `0x${Number(941).toString(16)}`,
  chainName: "PulseChain Testnet V2b",
  nativeCurrency: {
    name: "Test Pulse",
    symbol: "tPLS",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.v2b.testnet.pulsechain.com"],
  blockExplorerUrls: ["https://scan.v2b.testnet.pulsechain.com"],
};

export const setNetworkToPulseChainTestnet = async () => {
  const { ethereum } = window as any;
  try {
    if (!ethereum) throw new Error("No crypto wallet found");
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: pulseChainTestNet.chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [pulseChainTestNet],
        });
      } catch (err) {
        console.error(err);
      }
    }
    // handle other "switch" errors
  }
};
