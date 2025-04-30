import { useState, useEffect } from 'react';

// Define the subscriber type for TypeScript
interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribed_at: string;
}

export default function SubscribersList() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load subscribers when component mounts
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/newsletter/subscribers');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch subscribers');
        }

        setSubscribers(data.subscribers);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching subscribers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Function to format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Function to export subscribers as CSV
  const exportToCSV = () => {
    if (subscribers.length === 0) return;
    
    // Create CSV header
    const header = ['Name', 'Email', 'Subscribed Date'];
    
    // Create CSV rows
    const rows = subscribers.map(sub => [
      sub.name,
      sub.email,
      formatDate(sub.subscribed_at)
    ]);
    
    // Combine header and rows
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set download attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-8 w-8 border-4 border-primary-blue border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
        <div>
          <button
            onClick={exportToCSV}
            disabled={subscribers.length === 0}
            className={`px-4 py-2 bg-green-600 text-white rounded-md ${
              subscribers.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            Export CSV
          </button>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No subscribers yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Subscription Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="py-3 px-4">{subscriber.name}</td>
                  <td className="py-3 px-4">{subscriber.email}</td>
                  <td className="py-3 px-4">{formatDate(subscriber.subscribed_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Total Subscribers: {subscribers.length}
      </div>
    </div>
  );
}
