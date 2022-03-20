import Link from "next/link";

export default function Hero() {
    return (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Try</span>{" "}
        <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-tr from-pls-0 via-pls-1 via-pls-2 via-pls-3 to-pls-4">
          Pulse Chain
        </span>{" "}
        <span className="block xl:inline">Testnet</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Quick and easy way to try out the Pulse Chain Testnet. Pulse Chain is an
        energy efficient, cheaper, faster, fee-burning Ethereum fork.
      </p>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <Link href="https://pulsechain.com">
            <a
              href="https://pulsechain.com/"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Learn more
            </a>
          </Link>
        </div>
      </div>
    </div>
    )
}