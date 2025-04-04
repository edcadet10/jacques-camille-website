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

// Function to check if the question matches any predefined questions exactly
export const isPredefinedQuestion = (question: string): boolean => {
  const normalizedQuestion = question.trim().toLowerCase();
  
  // Check if the question matches any predefined question exactly
  return questionsAnswers.some(qa => 
    qa.question.toLowerCase() === normalizedQuestion
  );
};

// Function to find the predefined answer
export const getPredefinedAnswer = (question: string): string => {
  const normalizedQuestion = question.trim().toLowerCase();
  
  // Find the matching question
  const match = questionsAnswers.find(qa => 
    qa.question.toLowerCase() === normalizedQuestion
  );
  
  // Return the answer or default message
  return match?.answer || "I don't have a predefined answer for that specific question. Let me provide a general response.";
};

// Function to generate a response using Gemini API
export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    // For safety, add a system prompt to guide the AI's responses
    const fullPrompt = `As a helpful AI assistant responding on Jacques Evens Camille's website, 
    please provide a knowledgeable and concise response to the following question 
    that does not relate directly to Jacques Evens Camille. Maintain a professional 
    and courteous tone consistent with Jacques' brand as an Executive Leadership Coach 
    and Organizational Development Expert: ${prompt}`;
    
    // Get the model and start a chat - using the model version that worked in our test
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Generate a response
    const result = await model.generateContent(fullPrompt);
    const response = result.response.text();
    
    // Return the response with the CTA or a fallback message if empty
    return (response ? `${response}\n\n${CONSULTATION_CTA}` : "I apologize, but I couldn't generate a response at this time. Would you like to ask something else or try rephrasing your question?");
  } catch (error) {
    console.error('Error generating response from Gemini API:', error);
    
    // Try with fallback model if first attempt fails
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
      const result = await fallbackModel.generateContent(prompt);
      const fallbackResponse = result.response.text();
      
      return (fallbackResponse ? `${fallbackResponse}\n\n${CONSULTATION_CTA}` : "I apologize, but I couldn't generate a response at this time. Would you like to ask something else or try rephrasing your question?");
    } catch (fallbackError) {
      console.error('Error with fallback model:', fallbackError);
      return "I'm experiencing technical difficulties at the moment. Please try again later or ask a different question.";
    }
  }
};

// Combined function to get responses based on question type
export const getAIResponse = async (question: string): Promise<string> => {
  // First check if it's a predefined question with an exact match
  if (isPredefinedQuestion(question)) {
    return getPredefinedAnswer(question);
  } else {
    // Use Gemini API for all other questions
    return await generateGeminiResponse(question);
  }
};
