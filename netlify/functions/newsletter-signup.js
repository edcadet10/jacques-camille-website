const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Promisify fs functions
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);

// Path to JSON file for storing subscribers
const DATA_FILE_PATH = path.join(__dirname, '..', '..', 'data', 'newsletter-subscribers.json');

// Ensure directories exist
const ensureDirectoryExists = async () => {
  const dataDir = path.join(__dirname, '..', '..', 'data');
  
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Ignore if directory already exists
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
};

// Load subscribers from JSON file
const loadSubscribers = async () => {
  await ensureDirectoryExists();
  
  try {
    // Check if file exists
    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Create empty subscribers file
      await writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    
    // Read and parse existing subscribers
    const data = await readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading subscribers:', error);
    return [];
  }
};

// Save subscribers to JSON file
const saveSubscribers = async (subscribers) => {
  await ensureDirectoryExists();
  
  try {
    await writeFile(DATA_FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving subscribers:', error);
    throw new Error('Failed to save subscriber data');
  }
};

// Generate a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Netlify function handler
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { name, email } = JSON.parse(event.body);
    
    // Validate input
    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Name and email are required' })
      };
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Please provide a valid email address' })
      };
    }
    
    // Load current subscribers
    const subscribers = await loadSubscribers();
    
    // Check if email already exists
    if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
      return {
        statusCode: 409,
        body: JSON.stringify({ success: false, error: 'This email is already subscribed' })
      };
    }
    
    // Create new subscriber
    const newSubscriber = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subscribed_at: new Date().toISOString()
    };
    
    // Add to subscribers list
    subscribers.push(newSubscriber);
    
    // Save updated list
    await saveSubscribers(subscribers);
    
    // Return success response
    return {
      statusCode: 201,
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to the newsletter'
      })
    };
  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};
