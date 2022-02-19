import type { AppProps } from "next/app"

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
