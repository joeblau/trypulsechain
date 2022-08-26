import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Try</span>{" "}
            <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-tr from-pls-1 via-pls-2 to-pls-3">
              PulseChain
            </span>{" "}
            <span className="block xl:inline">Testnet</span>
          </h1>
          <div className="flex justify-center py-6">
            <p className="max-w-lg">
              Quick and easy way to try out the PulseChain Testnet. PulseChain
              is an energy efficient, cheaper, faster, fee-burning Ethereum
              fork.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
