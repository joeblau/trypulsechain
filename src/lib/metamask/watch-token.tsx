export const watchToken = async (tokenAddress: string) => {
  const { ethereum } = window as any;

  const web3 = Moralis.web3Library;

  const provider = new web3.providers.Web3Provider(ethereum);
  const contract = new web3.Contract(tokenAddress, ERC20.abi, provider);
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

  try {
    await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: symbol,
          decimals: decimals,
          image: null,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
