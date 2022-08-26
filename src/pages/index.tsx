import Head from "next/head";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Steps from "../components/steps";
import Footer from "../components/footer";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const title = "Try PulseChain";
  const description =
    "The fastest way to test all of the new features on PulseChain Testnet v2b";
  const image = "https://trypulsechain.com/images/share-card.png";

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hexwalletapp" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Open Graph */}
        <meta
          property="og:url"
          content="https://trypulsechain.com"
          key="ogurl"
        />
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="og:site_name" content="" key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>{title}</title>
      </Head>

      <main className="mx-auto max-w-4xl px-4">
        <Navbar />
        <Hero />
        <Steps />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
