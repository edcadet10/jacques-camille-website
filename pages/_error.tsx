import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/layout/Layout';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <Layout>
      <Head>
        <title>{statusCode ? `Error ${statusCode}` : 'Error'} | Jacques Evens Camille</title>
      </Head>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-20 pb-12">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-4xl font-heading font-bold text-primary-dark mb-4">
            {statusCode ? `Error ${statusCode}` : 'An Error Occurred'}
          </h1>
          
          <p className="text-gray-dark mb-8">
            {statusCode
              ? statusCode === 404
                ? 'The page you are looking for does not exist.'
                : 'An error occurred while loading this page.'
              : 'An error occurred on the client side.'}
          </p>
          
          <Link href="/" className="inline-block bg-primary-blue text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors duration-200">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;