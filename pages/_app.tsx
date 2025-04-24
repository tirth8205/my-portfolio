import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <Script
        src="https://va.vercel-scripts.com/v1/speed-insights/script.js"
        strategy="afterInteractive"
      />
    </>
  );
}