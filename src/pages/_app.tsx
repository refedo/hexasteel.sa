import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';
import ErrorBoundary from '../components/common/ErrorBoundary';
import '../styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Head>
          <title>Hexa Steel - Leading Steel Structure Manufacturer</title>
          <meta name="description" content="Hexa Steel - Your trusted partner in steel structure manufacturing, offering comprehensive solutions from design to installation." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </SessionProvider>
  );
}

export default App;
