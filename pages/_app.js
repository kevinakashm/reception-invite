import '../styles/globals.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
          Blessed by family, surrounded by love, and ready for forever — come celebrate with us! ✨
        </meta>
        <title>Arvinth weds Mohanapriya</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
