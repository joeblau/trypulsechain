import { CheckIcon } from "@heroicons/react/solid";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNetwork, useAccount, useBalance, useConnect } from "wagmi";
import { chains } from "../lib/chains";
import { BigNumber } from "ethers";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Steps() {
    const [didClickHEX, setDidClickHEX] = useState<boolean>(false);
    const [didClickPLSX, setDidClickPLSX] = useState<boolean>(false);
    const [didClickHDRN, setDidClickHDRN] = useState<boolean>(false);
    const [{ data: connectData }, connect] = useConnect();
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
        "You do not have MetaMask installed, this will take you to the MetaMask website to install it.",
      status: "current",
      actionTitle: "Install",
      disableSkip: true,
      action: async () => {
        window.open("https://metamask.io/");
      },
    },
    {
      id: 2,
      name: "Connect to the Site",
      description:
        "You do not have MetaMask connected to this site. This will prompt MetaMask to be able to read your balance.",
      status: "upcoming",
      actionTitle: "Connect",
      disableSkip: true,
      action: async () => {
        await connect(connector);
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
        await connector.watchAsset({
          address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
          symbol: "HEX",
        });
        setDidClickHEX(true);
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
        await connector.watchAsset({
          address: "0x13Bed2Fd9F91e80B8dcec3EBa6e6aE4964CF90a0",
          image:
            "https://www.icohotlist.com/wp-content/uploads/2022/01/2022-01-14-084458.jpg",
          symbol: "PLSX",
        });
        setDidClickPLSX(true);
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
        await connector.watchAsset({
          address: "0x3819f64f282bf135d62168C1e513280dAF905e06",
          image: "https://hedron.pro/img/token/hdrn/256.png",
          symbol: "HDRN",
        });
        setDidClickHDRN(true);
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
    {
      id: 8,
      name: "Swap Two Tokens",
      description: "Use uniswap on test net to swap your tPLS tokens for HEX.",
      status: "upcoming",
      actionTitle: "Swap Tokens",
      disableSkip: false,
      action: async () => {
        window.open("https://app.v2b.testnet.pulsex.com");
      },
    },
    {
      id: 9,
      name: "Try Freepulse.io",
      description: "Get 10,000 free test Pulse every hour.",
      status: "upcoming",
      actionTitle: "Try Freepulse.io",
      disableSkip: false,
      action: async () => {
        window.open("https://freepulse.io");
      },
    },
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
    if (steps[1].status === "current" && connectData?.connected) {
      goToNextStep();
    }
  }, [steps, connectData, goToNextStep]);

  const checkPulseChainAdded = useCallback(() => {
    if (steps[2].status === "current" && networkData.chain?.id == 941) {
      goToNextStep();
    }
  }, [steps, networkData, goToNextStep]);

  const checkIfAddedToken = useCallback(() => {
    if (
      (steps[3].status === "current" && didClickHEX) ||
      (steps[4].status === "current" && didClickPLSX) ||
      (steps[5].status === "current" && didClickHDRN)
    ) {
      goToNextStep();
    }
  }, [steps, didClickHEX, didClickPLSX, didClickHDRN, goToNextStep]);

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
    checkIfAddedToken();
    checkHavePulse();
  }, [
    checkMetamaskInstalled,
    checkIfMetamaskConnected,
    checkPulseChainAdded,
    checkIfAddedToken,
    checkHavePulse,
  ]);

  const skipStep = () => goToNextStep();

  return (
  <div className="flex justify-center">
      <nav aria-label="Progress" className="py-24 max-w-lg">
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
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a className="relative flex items-start group">
                    <span className="h-9 flex items-center">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full">
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
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full">
                        <span className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
                      </span>
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col space-y-4">
                      <span className="text-xs font-semibold tracking-wide uppercase text-blue-600">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                      <span className="flex flex-row space-x-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={step.action}
                        >
                          {step.actionTitle}
                        </button>

                        <button
                          disabled={step.disableSkip}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
}