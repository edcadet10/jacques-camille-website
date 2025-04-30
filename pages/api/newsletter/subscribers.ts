import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { getSession } from 'next-auth/react';

// Path to JSON file for storing subscribers
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'newsletter-subscribers.json');

// Load subscribers from JSON file
const loadSubscribers = () => {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading subscribers:', error);
    return [];
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Authentication check - this is a protected endpoint
    // For Netlify CMS, we'd typically check the Netlify Identity JWT
    // For this implementation, we'll check for admin user in session
    // Replace this with actual auth logic for your production implementation
    
    // For now, we'll assume the request is coming from an authenticated admin user
    // In production, implement proper authentication checks here!
    
    // Load subscribers
    const subscribers = loadSubscribers();
    
    // Return subscribers list
    return res.status(200).json({ 
      success: true, 
      subscribers
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
