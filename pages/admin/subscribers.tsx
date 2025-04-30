import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SubscribersList from '../../components/admin/SubscribersList';

export default function AdminSubscribersPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated with Netlify Identity
    if (window.netlifyIdentity) {
      const user = window.netlifyIdentity.currentUser();
      
      if (user) {
        setIsAuthenticated(true);
      } else {
        // Redirect to admin login if not authenticated
        router.push('/admin');
      }
    } else {
      // If Netlify Identity is not loaded yet, load it
      const script = document.createElement('script');
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      script.onload = () => {
        window.netlifyIdentity.on('init', (user) => {
          if (user) {
            setIsAuthenticated(true);
          } else {
            router.push('/admin');
          }
        });
      };
      document.head.appendChild(script);
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-primary-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h1>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Newsletter Subscribers | Jacques Evens Camille Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => window.netlifyIdentity?.logout()}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Log Out
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <SubscribersList />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
