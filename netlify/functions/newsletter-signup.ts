import { Handler } from '@netlify/functions';

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

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body || '{}');
    const { name, email } = requestBody;
    
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
    
    // Create subscriber data object
    const newSubscriber: Subscriber = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subscribed_at: new Date().toISOString()
    };
    
    // TODO: In a production environment, you would typically:
    // 1. Connect to a database (Fauna, Supabase, MongoDB Atlas, etc.)
    // 2. Use an email newsletter service API (Mailchimp, ConvertKit, etc.)
    
    console.log('New newsletter subscriber:', newSubscriber);
    
    // For now, we'll just return a success response
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

export { handler };
