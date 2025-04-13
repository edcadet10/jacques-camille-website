import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="max-w-xl w-full p-8 bg-white rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-heading font-bold text-primary-dark mb-4">Something went wrong</h2>
            <p className="text-gray-dark mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="mb-6 p-4 bg-gray-100 rounded-md overflow-auto text-left">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {this.state.error?.stack?.split('\n').slice(0, 5).join('\n')}
              </pre>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Try again
              </button>
              <Link href="/" className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-dark transition-colors">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;