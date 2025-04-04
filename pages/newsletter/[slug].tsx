import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { marked } from 'marked';

// Components
import Layout from '@components/layout/Layout';
import { getAllContent, getContentBySlug, ContentItem } from '@utils/content/contentLoader';

interface NewsletterProps {
  newsletter: ContentItem;
}

export default function NewsletterPage({ newsletter }: NewsletterProps) {
  const formattedDate = new Date(newsletter.frontmatter.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Layout>
      <Head>
        <title>{newsletter.frontmatter.title} | Jacques Evens Camille</title>
        <meta name="description" content={newsletter.frontmatter.summary || ''} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={`${newsletter.frontmatter.title} | Jacques Evens Camille`} />
        <meta property="og:description" content={newsletter.frontmatter.summary || ''} />
        <meta property="og:image" content={newsletter.frontmatter.thumbnail || ''} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${newsletter.frontmatter.title} | Jacques Evens Camille`} />
        <meta name="twitter:description" content={newsletter.frontmatter.summary || ''} />
        <meta name="twitter:image" content={newsletter.frontmatter.thumbnail || ''} />
      </Head>
      
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Newsletter Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Link href="/newsletter">
              <a className="inline-flex items-center text-primary-blue hover:text-primary-gold transition-colors duration-200 mb-6">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Newsletters
              </a>
            </Link>
            
            <div className="text-sm text-gray-500 mb-2">
              {formattedDate}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark mb-6">
              {newsletter.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {newsletter.frontmatter.tags && newsletter.frontmatter.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {tag.replace('-', ' ')}
                </span>
              ))}
            </div>
            
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-12">
              <Image
                src={newsletter.frontmatter.thumbnail || "/images/placeholder-newsletter.jpg"}
                alt={newsletter.frontmatter.title}
                layout="fill"
                objectFit="cover"
                className="z-0"
              />
            </div>
          </motion.div>
          
          {/* Newsletter Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: marked(newsletter.content) }}
              />
            </div>
            
            {/* Sharing and Subscription Section */}
            <div className="bg-primary-blue bg-opacity-5 p-8 rounded-xl border border-primary-blue border-opacity-20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h2 className="text-2xl font-heading font-semibold text-primary-dark mb-2">
                    Found this valuable?
                  </h2>
                  <p className="text-gray-dark">
                    Share this newsletter with others who might benefit from it.
                  </p>
                  
                  <div className="flex space-x-4 mt-4">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsletter.frontmatter.title)}&url=${encodeURIComponent(`https://jacquesevens.com/newsletter/${newsletter.slug}`)}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.023 10.023 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://jacquesevens.com/newsletter/${newsletter.slug}`)}&title=${encodeURIComponent(newsletter.frontmatter.title)}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a 
                      href={`mailto:?subject=${encodeURIComponent(`Jacques Evens Camille: ${newsletter.frontmatter.title}`)}&body=${encodeURIComponent(`I thought you might find this newsletter interesting: ${newsletter.frontmatter.title}\n\nRead it here: https://jacquesevens.com/newsletter/${newsletter.slug}`)}`} 
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                      aria-label="Share via Email"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="md:w-1/2 text-center md:text-right">
                  <Link href="/#newsletter">
                    <a className="inline-block bg-primary-blue text-white py-3 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors duration-200">
                      Subscribe to the Newsletter
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Get all newsletters
    const newsletters = await getAllContent('newsletter');
    
    // Create paths for each newsletter
    const paths = newsletters.map(newsletter => ({
      params: {
        slug: newsletter.slug,
      },
    }));
    
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error getting newsletter paths:', error);
    
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const newsletter = await getContentBySlug('newsletter', slug);
    
    if (!newsletter) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        newsletter,
      },
      revalidate: 60, // Revalidate content every 60 seconds
    };
  } catch (error) {
    console.error('Error getting newsletter by slug:', error);
    
    return {
      notFound: true,
    };
  }
};
