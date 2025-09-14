import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KudosAI - Employee Recognition Platform</title>
        <meta name="description" content="Employee recognition and rewards platform with flexible points system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/output.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
