import { GoogleGenerativeAI } from '@google/generative-ai';
import { questionsAnswers } from './conversationData';

// Initialize the Google Generative AI with the API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Check if API key is available
if (!API_KEY) {
  console.error('Gemini API key is missing! Please check your environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Call-to-action text to append to AI-generated responses
const CONSULTATION_CTA = "I'd be happy to discuss this further in a personalized consultation. Would you like to book a session to explore this topic in more depth?";

// Maximum input length to prevent excessively long prompts
const MAX_INPUT_LENGTH = 500;

/**
 * Sanitizes and validates user input to prevent security risks
 * @param input - The user input to sanitize
 * @returns Sanitized string or empty string if invalid
 */
const sanitizeUserInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Trim whitespace and limit length
  let sanitized = input.trim();
  if (sanitized.length > MAX_INPUT_LENGTH) {
    sanitized = sanitized.substring(0, MAX_INPUT_LENGTH);
  }
  
  // Remove any potentially harmful sequences
  sanitized = sanitized.replace(/<\/?script[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/?iframe[^>]*>/gi, '');
  sanitized = sanitized.replace(/javascript:/gi, 'blocked:');
  
  return sanitized;
};

/**
 * Checks if a question matches any predefined questions exactly
 * @param question - The user question to check
 * @returns Boolean indicating if this is a predefined question
 */
export const isPredefinedQuestion = (question: string): boolean => {
  const normalizedQuestion = sanitizeUserInput(question).toLowerCase();
  if (!normalizedQuestion) return false;
  
  // Check if the question matches any predefined question exactly
  return questionsAnswers.some(qa => 
    qa.question.toLowerCase() === normalizedQuestion
  );
};

/**
 * Finds the predefined answer for a given question
 * @param question - The user question to find an answer for
 * @returns The predefined answer or a default message
 */
export const getPredefinedAnswer = (question: string): string => {
  const normalizedQuestion = sanitizeUserInput(question).toLowerCase();
  if (!normalizedQuestion) {
    return "I don't have a predefined answer for that specific question. Let me provide a general response.";
  }
  
  // Find the matching question
  const match = questionsAnswers.find(qa => 
    qa.question.toLowerCase() === normalizedQuestion
  );
  
  // Return the answer or default message
  return match?.answer || "I don't have a predefined answer for that specific question. Let me provide a general response.";
};

/**
 * Generates a response using the Gemini API
 * @param prompt - The sanitized user prompt
 * @returns The generated response with a CTA
 */
export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  // Validate input
  const sanitizedPrompt = sanitizeUserInput(prompt);
  if (!sanitizedPrompt) {
    return "I couldn't understand your question. Please try again with a clearer question.";
  }
  
  try {
    // For safety, add a system prompt to guide the AI's responses
    const fullPrompt = `As a helpful AI assistant responding on Jacques Evens Camille's website, 
    please provide a knowledgeable and concise response to the following question 
    that does not relate directly to Jacques Evens Camille. Maintain a professional 
    and courteous tone consistent with Jacques' brand as an Executive Leadership Coach 
    and Organizational Development Expert. 
    
    Do not provide information that could be harmful, illegal, or unethical.
    
    User question: ${sanitizedPrompt}`;
    
    // Get the model and start a chat - using the model version that worked in our test
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
    return (response ? `${response}\n\n${CONSULTATION_CTA}` : "I apologize, but I couldn't generate a response at this time. Would you like to ask something else or try rephrasing your question?");
  } catch (error) {
    console.error('Error generating response from Gemini API:', error);
    
    // Try with fallback model if first attempt fails
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
      const result = await fallbackModel.generateContent(sanitizedPrompt);
      const fallbackResponse = result.response.text();
      
      return (fallbackResponse ? `${fallbackResponse}\n\n${CONSULTATION_CTA}` : "I apologize, but I couldn't generate a response at this time. Would you like to ask something else or try rephrasing your question?");
    } catch (fallbackError) {
      console.error('Error with fallback model:', fallbackError);
      return "I'm experiencing technical difficulties at the moment. Please try again later or ask a different question.";
    }
  }
};

// Rate limiting variables
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const requestLimits = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS = 10; // Maximum number of requests per minute

/**
 * Implements rate limiting to prevent abuse
 * @param clientId - Identifier for the client (e.g., IP address or session ID)
 * @returns Boolean indicating if the request is allowed
 */
const checkRateLimit = (clientId: string): boolean => {
  const now = Date.now();
  const clientEntry = requestLimits.get(clientId);
  
  // If no previous requests or window expired, create new entry
  if (!clientEntry || now > clientEntry.resetTime) {
    requestLimits.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }
  
  // Check if limit exceeded
  if (clientEntry.count >= MAX_REQUESTS) {
    return false;
  }
  
  // Increment request count
  clientEntry.count += 1;
  return true;
};

/**
 * Main function to get AI responses based on question type
 * @param question - The user question
 * @param clientId - Optional client identifier for rate limiting
 * @returns The AI response
 */
export const getAIResponse = async (question: string, clientId: string = 'default'): Promise<string> => {
  // Check rate limit
  if (!checkRateLimit(clientId)) {
    return "You've sent too many messages in a short period. Please wait a moment before trying again.";
  }
  
  // Sanitize input
  const sanitizedQuestion = sanitizeUserInput(question);
  if (!sanitizedQuestion) {
    return "Please provide a valid question.";
  }
  
  // First check if it's a predefined question with an exact match
  if (isPredefinedQuestion(sanitizedQuestion)) {
    return getPredefinedAnswer(sanitizedQuestion);
  } else {
    // Use Gemini API for all other questions
    return await generateGeminiResponse(sanitizedQuestion);
  }
};
