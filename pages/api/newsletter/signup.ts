import { NextApiRequest, NextApiResponse } from 'next';

// Define subscriber type
interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribed_at: string;
}

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required' 
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid email address' 
      });
    }
    
    // Create subscriber data object
    const newSubscriber: Subscriber = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subscribed_at: new Date().toISOString()
    };
    
    // For production, we would typically connect to a database or external service
    // For now, we'll just log the data for demonstration purposes
    console.log('New newsletter subscriber:', newSubscriber);
    
    // TODO: In a real production scenario, you'd use one of these approaches:
    // 1. Connect to a database service (MongoDB, Firebase, etc.)
    // 2. Use a dedicated newsletter service like Mailchimp, ConvertKit, etc.
    // 3. Use Netlify Functions to handle and store the data
    
    // Return success response
    return res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to the newsletter'
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
