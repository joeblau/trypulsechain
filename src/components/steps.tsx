import { CheckIcon } from "@heroicons/react/24/solid";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useCallback } from "react";
import {
  useNetwork,
  useAccount,
  useBalance,
  useConnect,
  useSwitchNetwork,
} from "wagmi";
import { pulseChainTestnet } from "../lib/chainConfig";
import { useStep } from "usehooks-ts";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Steps() {
  const tokenImage = (address: string) => {
    return `https://app.v2b.testnet.pulsex.com/images/tokens/${address}.png`;
  };

  const { switchNetwork } = useSwitchNetwork();
  const { connector, status: accountStatus } = useAccount();
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
  });
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: address,
  });

  const steps = [
    {
      id: 1,
      name: "Install Metamask",
      description:
        "You do not have MetaMask installed, this will take you to the MetaMask website to install it.",
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
        "Connect to trypulsechain.com in read-only mode. This allows the site to see if you've completed steps like claiming enough tPLS to use PulseX.",
      actionTitle: "Connect",
      disableSkip: true,
      action: async () => {
        await connect();
      },
    },
    {
      id: 3,
      name: "Add PulseChain Testnet",
      description:
        "You don't have the PulseChain Testnet added to your Metamask wallet. This will add the PulseChain Testnet to your MetaMask wallet and then switch to the PulseChain Testnet.",
      actionTitle: "Add Testnet",
      disableSkip: true,
      action: async () => {
        await switchNetwork?.(pulseChainTestnet.id);
      },
    },
    {
      id: 4,
      name: "Add HEX",
      description: "Watch the HEX token in your Metamask wallet.",
      actionTitle: "Add HEX",
      disableSkip: false,
      action: async () => {
        connector?.watchAsset?.({
          address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
          image: tokenImage("0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39"),
          symbol: "HEX",
        });
        goToNextStep();
      },
    },
    {
      id: 5,
      name: "Add PulseX",
      description: "Watch the PulseX token in your Metamask wallet.",
      actionTitle: "Add PulseX",
      disableSkip: false,
      action: async () => {
        connector?.watchAsset?.({
          address: "0x07895912f3AB0E33aB3a4CEFbdf7a3e121eb9942",
          image: tokenImage("0x07895912f3AB0E33aB3a4CEFbdf7a3e121eb9942"),
          symbol: "PLSX",
        });
        goToNextStep();
      },
    },
    {
      id: 6,
      name: "Get Free Test Pulse Tokens",
      description:
        "Your current wallet does not have any test pulse tokens (tPLS). This will take you to the PulseChain faucet to get some test pulse tokens.",
      actionTitle: "Get Test Pulse",
      disableSkip: balanceData?.value.isZero() ?? true,
      action: async () => {
        window.open("https://faucet.v2b.testnet.pulsechain.com/");
        goToNextStep();
      },
    },
    {
      id: 7,
      name: "Swap Two Tokens",
      description: "Use uniswap on test net to swap your tPLS tokens for HEX.",
      actionTitle: "Swap Tokens",
      disableSkip: false,
      action: async () => {
        window.open("https://app.v2b.testnet.pulsex.com");
        goToNextStep();
      },
    },
    {
      id: 8,
      name: "Stake or Delegate Pulse Tokens",
      description:
        "Stake or delegate your pulse tokens to a validator. This process will allow you to passively earn pulse tokens",
      actionTitle: "Stake or Delegate",
      disableSkip: false,
      action: async () => {
        window.open("https://stake.v2b.testnet.pulsechain.com/");
        goToNextStep();
      },
    },
    {
      id: 9,
      name: "Stake HEX on HEX.com",
      description: "Use HEX.com to stake your HEX tokens.",
      actionTitle: "Try HEX",
      disableSkip: false,
      action: async () => {
        window.open("https://go.hex.com/");
        goToNextStep();
      },
    },
    {
      id: 10,
      name: "Success!",
      description: "You completed the PulseChian Testnet introuduction.",
    },
  ];

  const [currentStep, helpers] = useStep(steps.length);
  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  const checkMetamaskInstalled = useCallback(() => {
    connectors.map((connector) => {
      if (currentStep === 1 && connector.name === "MetaMask") {
        setStep(2);
      }
    });
  }, [steps, connector, connectors, goToNextStep]);

  const checkIfMetamaskConnected = useCallback(() => {
    console.log(accountStatus);
    if (currentStep === 2 && accountStatus == "connected") {
      setStep(3);
    } else if (currentStep > 2 && accountStatus !== "connected") {
      setStep(2);
    }
  }, [steps, accountStatus]);

  const checkPulseChainAdded = useCallback(() => {
    if (currentStep === 3 && chain?.id == 941) {
      setStep(4);
    } else if (currentStep > 3 && chain?.id != 941) {
      setStep(3);
    }
  }, [steps, chain]);

  useEffect(() => {
    checkMetamaskInstalled();
    checkIfMetamaskConnected();
    checkPulseChainAdded();
  }, [checkMetamaskInstalled, checkIfMetamaskConnected, checkPulseChainAdded]);

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
              {currentStep > step.id ? (
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
              ) : currentStep === step.id ? (
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
                        {step.actionTitle && (
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={step.action}
                          >
                            {step.actionTitle}
                          </button>
                        )}

                        {step.disableSkip !== undefined && (
                          <button
                            disabled={step.disableSkip}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            onClick={goToNextStep}
                          >
                            Skip
                          </button>
                        )}
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
