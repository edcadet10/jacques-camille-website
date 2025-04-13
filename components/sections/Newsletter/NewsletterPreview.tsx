import Link from 'next/link';
import Image from 'next/image';

export default function NewsletterPreview() {
  // In a real implementation, this would fetch the latest newsletter from the CMS
  // For now, we'll use a static preview
  const latestNewsletter = {
    title: "Leadership in Times of Change",
    date: "April 4, 2025",
    thumbnail: "/images/placeholder-newsletter.jpg",
    summary: "Effective leadership strategies for navigating organizational change and transformation in today's dynamic business environment.",
    slug: "/newsletter/leadership-in-times-of-change"
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-gold/20 z-10"></div>
        <Image
          src={latestNewsletter.thumbnail}
          alt={latestNewsletter.title}
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
        <div className="absolute top-0 left-0 bg-primary-blue text-white px-4 py-2 text-sm font-medium z-20">
          Latest Issue
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {latestNewsletter.date}
        </div>
        
        <h3 className="text-xl font-heading font-semibold text-primary-dark mb-3">
          {latestNewsletter.title}
        </h3>
        
        <p className="text-gray-dark mb-6">
          {latestNewsletter.summary}
        </p>
        
        <Link href="/newsletter" className="text-primary-blue hover:text-primary-gold transition-colors duration-200 font-medium inline-flex items-center">
            Read the Latest Newsletter
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
        </Link>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link href="/newsletter/archive" className="text-gray-500 hover:text-primary-blue transition-colors duration-200">
              Browse Newsletter Archive →
          </Link>
        </div>
      </div>
    </div>
  );
}
