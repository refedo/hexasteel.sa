import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <Head>
        <title>Error - Hexa Steel®</title>
      </Head>
      
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          {statusCode ? `Error ${statusCode}` : 'An error occurred'}
        </h1>
        <p className="text-gray-600">
          {statusCode === 404
            ? "The page you're looking for doesn't exist."
            : 'Sorry, something went wrong on our end.'}
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
