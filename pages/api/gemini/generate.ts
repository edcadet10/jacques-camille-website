import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Call-to-action text to append to AI-generated responses
const CONSULTATION_CTA = "I'd be happy to discuss this further in a personalized consultation. Would you like to book a session to explore this topic in more depth?";

// Initialize the Google Generative AI with the API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Maximum input length to prevent excessively long prompts
const MAX_INPUT_LENGTH = 500;

// Set CORS headers for API routes
const setCorsHeaders = (res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  setCorsHeaders(res);

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { prompt, clientId } = req.body;
    
    // Validate input
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt is required' 
      });
    }
    
    // Trim whitespace and limit length
    let sanitizedPrompt = prompt.trim();
    if (sanitizedPrompt.length > MAX_INPUT_LENGTH) {
      sanitizedPrompt = sanitizedPrompt.substring(0, MAX_INPUT_LENGTH);
    }

    // Check if API key is available
    if (!API_KEY) {
      console.error('Gemini API key is missing! Please check your environment variables.');
      return res.status(500).json({ 
        success: false, 
        error: 'API configuration error' 
      });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // For safety, add a system prompt to guide the AI's responses
    const fullPrompt = `As a helpful AI assistant responding on Jacques Evens Camille's website, 
    please provide a knowledgeable and concise response to the following question 
    that does not relate directly to Jacques Evens Camille. Maintain a professional 
    and courteous tone consistent with Jacques' brand as an Executive Leadership Coach 
    and Organizational Development Expert. 
    
    Do not provide information that could be harmful, illegal, or unethical.
    
    User question: ${sanitizedPrompt}`;
    
    // Get the model and start a chat
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Add safety settings
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1000,
    };
    
    // Generate a response with safety settings
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig,
    });
    
    const response = result.response.text();
    
    // Return the response with the CTA or a fallback message if empty
    return res.status(200).json({
      success: true,
      response: response ? `${response}\n\n${CONSULTATION_CTA}` : "I apologize, but I couldn't generate a response at this time. Would you like to ask something else or try rephrasing your question?"
    });
  } catch (error) {
    console.error('Error generating response from Gemini API:', error);
    
    // Try with fallback model if first attempt fails
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
      const result = await fallbackModel.generateContent(req.body.prompt);
      const fallbackResponse = result.response.text();
      
      return res.status(200).json({
        success: true,
        response: fallbackResponse ? `${fallbackResponse}\n\n${CONSULTATION_CTA}` : "I apologize, but I couldn't generate a response at this time. Would you like to ask something else or try rephrasing your question?"
      });
    } catch (fallbackError) {
      console.error('Error with fallback model:', fallbackError);
      return res.status(500).json({ 
        success: false, 
        error: 'Error generating AI response' 
      });
    }
  }
}
