import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MeTH</title>
        <meta name="description" content="math app with e from euler" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
