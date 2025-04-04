import { useState } from 'react';
import { getAIResponse } from '@utils/aiService';
import Head from 'next/head';

export default function TestChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{question: string; answer: string}[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const answer = await getAIResponse(input);
      setResponse(answer);
      setHistory([...history, {question: input, answer}]);
      setInput('');
    } catch (error) {
      console.error('Error getting AI response:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Head>
        <title>Jacques Camille - Chat Test Page</title>
      </Head>
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Jacques Camille Chat Test</h1>
        
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-sm text-blue-700">
              This is a test page for the chat functionality. Ask a question about Jacques 
              to test profile-specific responses, or ask a general question to test the 
              Gemini API integration.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </div>
        
        {response && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">Response:</h2>
            <p>{response}</p>
          </div>
        )}
        
        {history.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Conversation History:</h2>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-medium text-blue-600">Q: {item.question}</p>
                  <p className="mt-1">A: {item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
