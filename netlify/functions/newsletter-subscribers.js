const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Promisify fs functions
const readFile = promisify(fs.readFile);

// Path to JSON file for storing subscribers
const DATA_FILE_PATH = path.join(__dirname, '..', '..', 'data', 'newsletter-subscribers.json');

// Load subscribers from JSON file
const loadSubscribers = async () => {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return [];
  }
  
  try {
    const data = await readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading subscribers:', error);
    return [];
  }
};

// Verify authentication
const isAuthenticated = (event) => {
  try {
    // In a real production environment, you would check the Netlify Identity JWT token
    // and verify that the user is an administrator
    
    // For this implementation, we'll just check basic headers
    // In production, use proper authentication checks!
    
    // Check if the request has a Netlify Identity token
    const token = event.headers['authorization'] || 
                  event.headers['Authorization'];
                  
    // Always implement proper token validation in production!
    return !!token;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

// Netlify function handler
exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Check if user is authenticated
    if (!isAuthenticated(event)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, error: 'Unauthorized' })
      };
    }
    
    // Load subscribers
    const subscribers = await loadSubscribers();
    
    // Return subscribers list
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        subscribers 
      })
    };
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};
