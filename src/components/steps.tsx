import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useCallback } from "react";
import { isMobile } from "react-device-detect";
import {
  useNetwork,
  useAccount,
  useBalance,
  useConnect,
  useSwitchNetwork,
} from "wagmi";
import { pulseChainTestnet } from "../lib/chainConfig";
import { useStep } from "usehooks-ts";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function Steps() {
  const tokenImage = (address: string) => {
    return `https://app.v2b.testnet.pulsex.com/images/tokens/${address}.png`;
  };

  const { width, height } = useWindowSize();
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

  const altSteps: any = {
    1: {
      id: 1,
      name: "Open Metamask",
      description: "Open Try PulseChain using the Metamask app on your phone.",
      actionTitle: "Open",
      disableSkip: true,
      action: async () => {
        window.open("https://metamask.app.link/dapp/trypulsechain.com");
      },
    },
  };

  const steps: any[] = [
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
  const { goToNextStep, setStep } = helpers;

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

  const card = (step: any) => {
    return (
      <div className="card card-compact">
        <div className="card-body text-left">
          <h2 className="card-title">{step.name}</h2>
          <p>{step.description}</p>
          {currentStep === step.id && (
            <div className="card-actions justify-start">
              {step.actionTitle && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={step.action}
                >
                  {step.actionTitle}
                </button>
              )}

              {step.disableSkip !== undefined && (
                <button
                  disabled={step.disableSkip}
                  type="button"
                  className="btn btn-secondary"
                  onClick={goToNextStep}
                >
                  Skip
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep = (step: any, stepIdx: number) => {
    return currentStep >= step.id ? (
      <li key={stepIdx} className="step step-primary">
        {card(step)}
      </li>
    ) : (
      <li key={stepIdx} className="step">
        {card(step)}
      </li>
    );
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Progress" className="max-w-2xl">
        <Confetti
          width={width}
          height={height}
          run={currentStep === steps.length}
        />
        {currentStep == steps.length ? (
          <div>
            <h2 className="text-7xl tracking-tight font-bold sm:text-8xl py-12 sm:py-24">
              <span className="block">Success 🚀</span>
            </h2>
          </div>
        ) : (
          <ul className="steps steps-vertical">
            {steps.slice(0, steps.length - 1).map((step, stepIdx) => (
              <>
                {isMobile &&
                Object.keys(altSteps)
                  .map((key) => parseInt(key))
                  .includes(step.id)
                  ? renderStep(altSteps[step.id], stepIdx)
                  : renderStep(step, stepIdx)}
              </>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
