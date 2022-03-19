import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/solid";
import { InjectedConnector } from "wagmi/connectors/injected";

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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Home: NextPage = () => {
  const connector = new InjectedConnector();

  const installMetamask = async () => {
    if (connector.getProvider() != null) {
      setSteps(
        steps.map((step) => {
          if (step.id <= 1) {
            return { ...step, status: "complete" };
          } else if (step.id === 2) {
            return { ...step, status: "current" };
          } else {
            return step;
          }
        })
      );
    }
  };

  const setNetworkToPulseChainTestnet = async () => {
    const { ethereum } = window as any;
    try {
      if (!ethereum) throw new Error("No crypto wallet found");
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: pulseChainTestNet.chainId }],
      });

      setSteps(
        steps.map((step) => {
          if (step.id <= 2) {
            return { ...step, status: "complete" };
          } else if (step.id === 3) {
            return { ...step, status: "current" };
          } else {
            return step;
          }
        })
      );
    } catch (switchError: any) {
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
    }
  };

  const watchHEX = async () => {
    await connector.watchAsset({
      address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
      symbol: "HEX",
    });

    setSteps(
      steps.map((step) => {
        if (step.id <= 3) {
          return { ...step, status: "complete" };
        } else if (step.id === 4) {
          return { ...step, status: "current" };
        } else {
          return step;
        }
      })
    );
  };

  const watchHDRN = async () => {
    await connector.watchAsset({
      address: "0x3819f64f282bf135d62168C1e513280dAF905e06",
      symbol: "HDRN",
    });

    setSteps(
      steps.map((step) => {
        if (step.id <= 4) {
          return { ...step, status: "complete" };
        } else if (step.id === 5) {
          return { ...step, status: "current" };
        } else {
          return step;
        }
      })
    );
  };

  const watchPLSX = async () => {
    await connector.watchAsset({
      address: "0x13Bed2Fd9F91e80B8dcec3EBa6e6aE4964CF90a0",
      symbol: "PLSX",
    });

    setSteps(
      steps.map((step) => {
        if (step.id <= 5) {
          return { ...step, status: "complete" };
        } else if (step.id === 6) {
          return { ...step, status: "current" };
        } else {
          return step;
        }
      })
    );
  };

  const getTestPulseFromFaucet = async () => {
    const pulseChainFaucetURL = "https://faucet.v2b.testnet.pulsechain.com/";
    const win = window.open(pulseChainFaucetURL, "_blank");
    win?.focus();
  };
  const swapTokensOnUniswap = async () => {
    0x2b591e99afe9f32eaa6214f7b7629768c40eeb39;
  };
  const addHEXToMetamask = async () => {};
  const stakeYourHEX = async () => {};

  const [steps, setSteps] = useState([
    {
      id: 1,
      name: "Install Metamask",
      description:
        "You do not have metamask installed, this will take you to the metamask website to install it.",
      status: "current",
      actionTitle: "Install",
      action: installMetamask,
    },
    {
      id: 2,
      name: "Add PulseChain Testnet",
      description:
        "You don't have the PulseChain Testnet added to your Metamask wallet. This will add the PulseChain Testnet to your MetaMask wallet and then switch to the pulsechain testnet.",
      status: "upcoming",
      actionTitle: "Add Testnet",
      action: setNetworkToPulseChainTestnet,
    },
    {
      id: 3,
      name: "Add HEX",
      description: "Add the tokens you want to watch to your Metamask wallet.",
      status: "upcoming",
      actionTitle: "Add HEX",
      action: watchHEX,
    },
    {
      id: 4,
      name: "Add Hedron",
      description: "Add the tokens you want to watch to your Metamask wallet.",
      status: "upcoming",
      actionTitle: "Add HEX",
      action: watchHDRN,
    },
    {
      id: 5,
      name: "Add PulseX",
      description: "Add the tokens you want to watch to your Metamask wallet.",
      status: "upcoming",
      actionTitle: "Add HEX",
      action: watchPLSX,
    },
    // {
    //   id: 4,
    //   name: "Get Test Pulse Tokens",
    //   description:
    //     "Your current wallet does not have any test pulse tokens (tPLS). This will take you to the PulseChain faucet to get some test pulse tokens.",
    //   href: "#",
    //   status: "upcoming",
    //   actionTitle: "Get Test Pulse",
    //   action: { getTestPulseFromFaucet },
    // },
    // {
    //   id: 5,
    //   name: "Swap Two Tokens",
    //   description: "Use uniswap on test net to swap your tPLS tokens for HEX.",
    //   href: "#",
    //   status: "upcoming",
    //   actionTitle: "Swap Tokens",
    //   action: { swapTokensOnUniswap },
    // },
    // {
    //   id: 6,
    //   name: "Add HEX to your wallet",
    //   description:
    //     "You don't have the HEX token added to your wallet. This will add the HEX token to your wallet.",
    //   href: "#",
    //   status: "upcoming",
    //   actionTitle: "Add HEX",
    //   action: { addHEXToMetamask },
    // },
    // {
    //   id: 7,
    //   name: "Stake Your tPLS",
    //   description:
    //     "Bonus: You can stake your tPLS tokens on a Validator to earn rewards. This will take you to the HEX staking page.",
    //   href: "#",
    //   status: "upcoming",
    //   actionTitle: "Stake HEX",
    //   action: { stakeYourHEX },
    // },
  ]);

  useEffect(() => {}, []);

  const hero = (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Try</span>{" "}
        <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-tr from-pls-0 via-pls-1 via-pls-2 via-pls-3 to-pls-4">
          PulseChain
        </span>{" "}
        <span className="block xl:inline">Testnet</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Quick and easy way to try out the PulseChain Testnet. Pulse Chain is an
        energy efficient, cheaper, faster, fee-burning Ethereum fork.
      </p>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <Link href="https://pulsechain.com">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Learn more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );

  const progress = (
    <div className="flex justify-center">
      <nav aria-label="Progress" className="pt-12 max-w-lg">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pb-10" : "",
                "relative"
              )}
            >
              {step.status === "complete" ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                  >
                    <span className="h-9 flex items-center">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                        <CheckIcon
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col">
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              ) : step.status === "current" ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                    aria-current="step"
                  >
                    <span className="h-9 flex items-center" aria-hidden="true">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                        <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                      </span>
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col space-y-4">
                      <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                      <span>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          // Add button action
                          onClick={step.action}
                        >
                          {step.actionTitle}
                        </button>
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                  >
                    <span className="h-9 flex items-center" aria-hidden="true">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col">
                      <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        {hero}
        {progress}
      </main>
    </div>
  );
};

export default Home;
