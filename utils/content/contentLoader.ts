import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentItem {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    thumbnail?: string;
    summary?: string;
    description?: string;
    tags?: string[];
    type?: string;
    [key: string]: any;
  };
  content: string;
}

/**
 * Convert any Date objects in the frontmatter to ISO strings
 * @param frontmatter The frontmatter object
 * @returns Processed frontmatter with Date objects converted to strings
 */
const processDateValues = (frontmatter: any): any => {
  const processed = { ...frontmatter };
  
  Object.keys(processed).forEach(key => {
    if (processed[key] instanceof Date) {
      processed[key] = processed[key].toISOString();
    }
  });
  
  return processed;
};

/**
 * Get all content items from a specific directory
 * @param directory Directory name inside the content folder
 * @returns Array of content items with frontmatter and slug
 */
export const getAllContent = async (directory: string): Promise<ContentItem[]> => {
  try {
    const contentDir = path.join(process.cwd(), 'content', directory);
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    
    const contentItems = files
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        // Create slug
        const slug = filename.replace('.md', '');
        
        // Get frontmatter and content
        const markdownWithMeta = fs.readFileSync(
          path.join(contentDir, filename),
          'utf-8'
        );
        
        const { data: frontmatter, content } = matter(markdownWithMeta);
        
        // Ensure required frontmatter fields are present and process dates
        let processedFrontmatter = {
          title: frontmatter.title || '',
          date: frontmatter.date || new Date().toISOString(),
          ...frontmatter
        };
        
        // Process any date objects in the frontmatter
        processedFrontmatter = processDateValues(processedFrontmatter);
        
        return {
          slug,
          frontmatter: processedFrontmatter,
          content
        } as ContentItem;
      })
      // Sort by date (newest first)
      .sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
      });
    
    return contentItems;
  } catch (error) {
    console.error(`Error loading content from ${directory}:`, error);
    return [];
  }
};

/**
 * Get a specific content item by slug
 * @param directory Directory name inside the content folder
 * @param slug Slug of the content item
 * @returns Content item with frontmatter and content
 */
export const getContentBySlug = async (directory: string, slug: string): Promise<ContentItem | null> => {
  try {
    const contentPath = path.join(process.cwd(), 'content', directory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(contentPath)) {
      return null;
    }
    
    const markdownWithMeta = fs.readFileSync(contentPath, 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);
    
    // Ensure required frontmatter fields are present and process dates
    let processedFrontmatter = {
      title: frontmatter.title || '',
      date: frontmatter.date || new Date().toISOString(),
      ...frontmatter
    };
    
    // Process any date objects in the frontmatter
    processedFrontmatter = processDateValues(processedFrontmatter);
    
    return {
      slug,
      frontmatter: processedFrontmatter,
      content
    } as ContentItem;
  } catch (error) {
    console.error(`Error loading content ${slug} from ${directory}:`, error);
    return null;
  }
};

/**
 * Get all newsletter content items
 * @returns Array of newsletter items with frontmatter and slug
 */
export const getAllNewsletters = async (): Promise<ContentItem[]> => {
  return getAllContent('newsletter');
};

/**
 * Get a specific newsletter by slug
 * @param slug Slug of the newsletter
 * @returns Newsletter item with frontmatter and content
 */
export const getNewsletterBySlug = async (slug: string): Promise<ContentItem | null> => {
  return getContentBySlug('newsletter', slug);
};

/**
 * Get all resources content items
 * @returns Array of resource items with frontmatter and slug
 */
export const getAllResources = async (): Promise<ContentItem[]> => {
  return getAllContent('resources');
};

/**
 * Get all blog posts
 * @returns Array of blog post items with frontmatter and slug
 */
export const getAllBlogPosts = async (): Promise<ContentItem[]> => {
  return getAllContent('blog');
};

/**
 * Get all testimonials
 * @returns Array of testimonial items with frontmatter and slug
 */
export const getAllTestimonials = async (): Promise<ContentItem[]> => {
  return getAllContent('testimonials');
};
