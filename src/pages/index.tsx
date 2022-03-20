import { useEffect, useState, useCallback, useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/solid";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useNetwork, useAccount, useBalance } from "wagmi";
import { chains } from "../lib/chains";
import { BigNumber } from "ethers";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Home: NextPage = () => {
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const [{ data: accountData }] = useAccount();
  const [{ data: balanceData }, getBalance] = useBalance({
    addressOrName: accountData?.address,
  });
  const connector = useMemo(
    () => new InjectedConnector({ chains: chains }),
    []
  );

  const [steps, setSteps] = useState([
    {
      id: 1,
      name: "Install Metamask",
      description:
        "You do not have metamask installed, this will take you to the metamask website to install it.",
      status: "current",
      actionTitle: "Install",
      disableSkip: true,
      action: async () => {
        window.open("https://metamask.io/");
      },
    },
    {
      id: 2,
      name: "Connect to the network",
      description:
        "You do not have metamask connected to the network, this will take you to the metamask website to connect it.",
      status: "current",
      actionTitle: "Connect",
      disableSkip: true,
      action: async () => {
        const result = await connector.connect();
        console.log(result);
      },
    },
    {
      id: 3,
      name: "Add PulseChain Testnet",
      description:
        "You don't have the PulseChain Testnet added to your Metamask wallet. This will add the PulseChain Testnet to your MetaMask wallet and then switch to the PulseChain Testnet.",
      status: "upcoming",
      actionTitle: "Add Testnet",
      disableSkip: true,
      action: async () => {
        const result = await connector.switchChain(941);
      },
    },
    {
      id: 4,
      name: "Add HEX",
      description: "Watch the HEX token in your Metamask wallet.",
      status: "upcoming",
      actionTitle: "Add HEX",
      disableSkip: false,
      action: async () => {
        const result = await connector.watchAsset({
          address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
          symbol: "HEX",
        });
      },
    },
    {
      id: 5,
      name: "Add PulseX",
      description: "Watch the PulseX token in your Metamask wallet.",
      status: "upcoming",
      actionTitle: "Add PulseX",
      disableSkip: false,
      action: async () => {
        const result = await connector.watchAsset({
          address: "0x13Bed2Fd9F91e80B8dcec3EBa6e6aE4964CF90a0",
          image:
            "https://www.icohotlist.com/wp-content/uploads/2022/01/2022-01-14-084458.jpg",
          symbol: "PLSX",
        });
      },
    },
    {
      id: 6,
      name: "Add Hedron",
      description: "Watch the Hedron token in your Metamask wallet.",
      status: "upcoming",
      actionTitle: "Add Hedron",
      disableSkip: false,
      action: async () => {
        const result = await connector.watchAsset({
          address: "0x3819f64f282bf135d62168C1e513280dAF905e06",
          image: "https://hedron.pro/img/token/hdrn/256.png",
          symbol: "HDRN",
        });
      },
    },
    {
      id: 7,
      name: "Get Test Pulse Tokens",
      description:
        "Your current wallet does not have any test pulse tokens (tPLS). This will take you to the PulseChain faucet to get some test pulse tokens.",
      status: "upcoming",
      actionTitle: "Get Test Pulse",
      disableSkip: false,
      action: async () => {
        window.open("https://faucet.v2b.testnet.pulsechain.com/");
      },
    },
    // {
    //   id: 8,
    //   name: "Swap Two Tokens",
    //   description: "Use uniswap on test net to swap your tPLS tokens for HEX.",
    //   status: "upcoming",
    //   actionTitle: "Swap Tokens",
    //   disableSkip: false,
    //   action: async () => {
    //     window.open("https://uniswap.v2.testnet.pulsechain.com/#/swap ");
    //   },
    // },
    // {
    //   id: 9,
    //   name: "Stake Your tPLS",
    //   description:
    //     "Bonus: You can stake your tPLS tokens on a Validator to earn rewards. This will take you to the HEX staking page.",
    //   status: "upcoming",
    //   actionTitle: "Stake HEX",
    //   disableSkip: false,
    //   action: async () => {},
    // },
  ]);

  const goToNextStep = useCallback(() => {
    let currentStepId = steps.find((step) => step.status === "current")?.id;
    if (currentStepId) {
      const thisStepId = currentStepId;
      const nextStepId = thisStepId + 1;
      setSteps(
        steps.map((step) => {
          if (step.id <= thisStepId) {
            return { ...step, status: "complete" };
          } else if (step.id === nextStepId) {
            return { ...step, status: "current" };
          } else {
            return step;
          }
        })
      );
    }
  }, [steps]);

  const checkMetamaskInstalled = useCallback(() => {
    if (steps[0].status === "current" && connector.getProvider() != null) {
      goToNextStep();
    }
  }, [steps, connector, goToNextStep]);

  const checkIfMetamaskConnected = useCallback(() => {
    if (steps[1].status === "current" && accountData?.address != null) {
      goToNextStep();
    }
  }, [steps, accountData, goToNextStep]);

  const checkPulseChainAdded = useCallback(() => {
    if (steps[2].status === "current" && networkData.chain?.id == 941) {
      goToNextStep();
    }
  }, [steps, networkData, goToNextStep]);

  const checkHavePulse = useCallback(() => {
    const balance = balanceData?.value;
    if (steps[6].status === "current") {
      if (balance?.gte(BigNumber.from(1))) {
        goToNextStep();
      } else {
        setSteps(
          steps.map((step) =>
            step.id === 7
              ? { ...step, disableSkip: true }
              : { ...step, disableSkip: false }
          )
        );
      }
    }
  }, [steps, balanceData, setSteps, goToNextStep]);

  const checkHasMoreThanPulse = useCallback(() => {
    if (steps[7].status === "current") {
      goToNextStep();
    }
  }, [steps, goToNextStep]);

  useEffect(() => {
    checkMetamaskInstalled();
    checkIfMetamaskConnected();
    checkPulseChainAdded();
    checkHavePulse();
  }, [
    checkMetamaskInstalled,
    checkIfMetamaskConnected,
    checkPulseChainAdded,
    checkHavePulse,
  ]);

  const skipStep = () => {
    goToNextStep();
  };

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
                  <a className="relative flex items-start group">
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
                      <span className="flex flex-row space-x-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          // Add button action
                          onClick={step.action}
                        >
                          {step.actionTitle}
                        </button>

                        <button
                          disabled={step.disableSkip}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          onClick={skipStep}
                        >
                          Skip
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
                  <a className="relative flex items-start group">
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
