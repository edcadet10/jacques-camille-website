import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/layout/Layout';
import { motion } from 'framer-motion';

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page Not Found | Jacques Evens Camille</title>
        <meta name="description" content="The page you are looking for cannot be found." />
      </Head>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg text-center"
        >
          <h1 className="text-4xl font-heading font-bold text-primary-dark mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-dark mb-8">
            The page you are looking for may have been moved, deleted, or might never have existed.
          </p>
          
          <div className="mb-8">
            <svg className="mx-auto w-32 h-32 text-primary-blue opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <Link href="/" className="inline-block bg-primary-blue text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors duration-200">
            Return to Home
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;