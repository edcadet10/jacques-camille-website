import { GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Components
import Layout from '@components/layout/Layout';
import { getAllContent, ContentItem } from '@utils/content/contentLoader';

interface NewsletterPageProps {
  newsletters: ContentItem[];
}

export default function NewsletterPage({ newsletters }: NewsletterPageProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter newsletters based on selected tag and search query
  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesTag = filter === 'all' || (newsletter.frontmatter.tags && newsletter.frontmatter.tags.includes(filter));
    const matchesSearch = searchQuery === '' || 
      newsletter.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (newsletter.frontmatter.summary && newsletter.frontmatter.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTag && matchesSearch;
  });
  
  // Get all unique tags from newsletters
  const allTags = Array.from(
    new Set(
      newsletters.flatMap(newsletter => newsletter.frontmatter.tags || [])
    )
  );
  
  return (
    <Layout>
      <Head>
        <title>Jacques Evens Camille | Newsletter</title>
        <meta name="description" content="Subscribe to Jacques Evens Camille's leadership newsletter for insights, tips, and strategies." />
      </Head>
      
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">
              Jacques' Leadership Newsletter
            </h1>
            <p className="text-xl text-gray-dark max-w-3xl mx-auto">
              Insights and strategies to enhance your leadership capabilities and organizational effectiveness.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-heading font-semibold text-primary-dark">
                  Newsletter Archive
                </h2>
                <p className="text-gray-dark">
                  Browse past issues or search for specific topics
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search newsletters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                  />
                  <svg 
                    className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                >
                  <option value="all">All Topics</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {filteredNewsletters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNewsletters.map((newsletter, index) => (
                  <motion.div
                    key={newsletter.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={newsletter.frontmatter.thumbnail || "/images/placeholder-newsletter.jpg"}
                        alt={newsletter.frontmatter.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {new Date(newsletter.frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      
                      <h3 className="text-xl font-heading font-semibold text-primary-dark mb-3">
                        {newsletter.frontmatter.title}
                      </h3>
                      
                      <p className="text-gray-dark mb-6 line-clamp-3">
                        {newsletter.frontmatter.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {newsletter.frontmatter.tags && newsletter.frontmatter.tags.map(tag => (
                          <span 
                            key={`${newsletter.slug}-${tag}`}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/newsletter/${newsletter.slug}`} className="text-primary-blue hover:text-primary-gold transition-colors duration-200 font-medium inline-flex items-center">
                          Read More
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-heading font-semibold text-gray-dark mb-2">
                  No Newsletters Found
                </h3>
                <p className="text-gray-500">
                  Try changing your search query or filter selection.
                </p>
              </div>
            )}
          </div>
          
          {/* Newsletter Signup Section */}
          <div className="bg-primary-blue bg-opacity-5 p-8 rounded-xl border border-primary-blue border-opacity-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-heading font-semibold text-primary-dark mb-2">
                  Subscribe to Jacques' Newsletter
                </h2>
                <p className="text-gray-dark">
                  Join over 2,000 leaders who receive monthly insights, practical tips, and exclusive content directly to their inbox.
                </p>
              </div>
              
              <div className="md:w-1/3 w-full">
                <Link href="/#newsletter" className="block w-full bg-primary-blue text-white text-center py-3 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors duration-200">
                    Subscribe Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Get all newsletters using the utility function
    const newsletters = await getAllContent('newsletter');
    
    return {
      props: {
        newsletters,
      },
    };
  } catch (error) {
    console.error('Error getting newsletters:', error);
    
    return {
      props: {
        newsletters: [],
      },
    };
  }
};
