import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Jacques Evens Camille - Executive Leadership Coach, Business Consultant, and Organizational Development Expert." />
        <meta name="keywords" content="Jacques Evens Camille, leadership coaching, organizational development, executive coaching, business consultant, Rwanda, Haiti, Africa, Caribbean" />
        <meta property="og:title" content="Jacques Evens Camille - Leadership & Organizational Development" />
        <meta property="og:description" content="Executive Leadership Coach and Organizational Development Expert with experience across Africa and the Caribbean." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jacquesecamille.com" />
        <meta property="og:image" content="https://jacquesecamille.com/images/jacques-camille.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Netlify Identity Widget */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `
        }} />
      </body>
    </Html>
  );
}