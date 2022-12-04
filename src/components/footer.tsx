import Link from "next/link";

const navigation = {
  core: [
    { name: "Block Explorer", href: "https://scan.v2b.testnet.pulsechain.com" },
    { name: "Ethereum Bridge", href: "https://pulseramp.com" },
    { name: "Faucet", href: "https://faucet.v2b.testnet.pulsechain.com" },
    { name: "PulseX", href: "https://app.v2b.testnet.pulsex.com" },
    {
      name: "Sacrifice Checker",
      href: "https://pulsechain-sacrifice-checker.vercel.app",
    },
    {
      name: "Validate/Stake",
      href: "https://stake.v2b.testnet.pulsechain.com/",
    },
  ],
  ecosystem: [
    { name: "FreePulse", href: "https://freepulse.io/" },
    { name: "Hurricash", href: "https://hurricash-testnet2b.on.fleek.co/" },
    { name: "Icosa ⨉ Hedron", href: "https://app.icosa.pro/" },
    { name: "Liquid Loans", href: "https://testnet.liquidloans.io/" },
    { name: "Maximus", href: "https://team-maximus.anvil.app" },
    { name: "Phamous", href: "https://testnet.phamous.io/" },
    { name: "Phatty", href: "https://phatty.io" },
    { name: "Phiat", href: "https://testnet.phiat.io/" },
    { name: "PNS", href: "https://app.pulse.domains" },
    { name: "PRC20's", href: "https://prc20s.com" },
  ],
  info: [
    {
      name: "Docs",
      href: "https://gitlab.com/pulsechaincom/pulsechain-testnet",
    },
    { name: "PulseChain", href: "https://pulsechain.com" },
  ],
  social: [
    {
      name: "Telegram",
      href: "https://t.me/PulsechainCom",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/PulsechainCom",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/joeblau/trypulsechain",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="footer py-10">
      <div>
        <span className="footer-title">Core Apps</span>
        {navigation.core.map((core, index) => (
          <Link key={index} href={core.href}>
            <a className="link link-hover">{core.name}</a>
          </Link>
        ))}
      </div>
      <div>
        <span className="footer-title">Ecosystem Apps</span>
        {navigation.ecosystem.map((ecosystem, index) => (
          <Link key={index} href={ecosystem.href}>
            <a className="link link-hover">{ecosystem.name}</a>
          </Link>
        ))}
      </div>
      <div>
        <span className="footer-title">Information</span>
        {navigation.info.map((info, index) => (
          <Link key={index} href={info.href}>
            <a className="link link-hover">{info.name}</a>
          </Link>
        ))}
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          {navigation.social.map((social, index) => (
            <Link key={index} href={social.href}>
              <a className="link link-hover">
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>
          ))}
        </div>
        <div>
          <p className="pt-2">
            This is a beta site built by a <br></br>PulseChain community member.
          </p>
        </div>
      </div>
    </footer>
  );
}
