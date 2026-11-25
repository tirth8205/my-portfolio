import '../styles/globals.css';
import '../styles/personal.css';
import '../styles/motion.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
