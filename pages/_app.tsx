import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Add Netlify Identity widget redirect handling
    if (typeof window !== 'undefined' && window.location.href.includes('#invite_token')) {
      const { netlifyIdentity } = window as any;
      if (netlifyIdentity) {
        netlifyIdentity.on('init', (user: any) => {
          if (!user) {
            netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });
      }
    }
  }, []);

  return (
    <>
      {/* Netlify Identity Widget Script */}
      {router.pathname === '/' && (
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="lazyOnload" />
      )}
      
      {/* Add redirect script for Netlify CMS */}
      {router.pathname === '/' && (
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      )}
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
