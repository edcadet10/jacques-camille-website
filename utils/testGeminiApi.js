/**
 * Test script for the Gemini API integration
 * 
 * To run this test:
 * 1. Open a terminal in the project root
 * 2. Run: node -r dotenv/config utils/testGeminiApi.js
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI with the API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Check if API key is available
if (!API_KEY) {
  console.error('Gemini API key is missing! Please check your environment variables.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Test function to generate a response using Gemini API
async function testGeminiApi() {
  try {
    console.log('Testing Gemini API connection...');
    
    // Test prompt
    const testPrompt = `As a helpful AI assistant responding on Jacques Evens Camille's website, 
    please provide a knowledgeable and concise response to the following question: 
    What are three effective strategies for improving team communication?`;
    
    // Try with gemini-1.5-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Generate a response
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(testPrompt);
    const response = result.response.text();
    
    console.log('\n=== API Response ===\n');
    console.log(response);
    console.log('\n=== End of Response ===\n');
    
    console.log('Gemini API test completed successfully!');
  } catch (error) {
    console.error('Error testing Gemini API:', error);
    
    // Try with gemini-1.0-pro if first attempt fails
    try {
      console.log('\nTrying with gemini-1.0-pro model...');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
      
      const testPrompt = `What are three effective strategies for improving team communication?`;
      
      console.log('Sending request to Gemini API...');
      const result = await model.generateContent(testPrompt);
      const response = result.response.text();
      
      console.log('\n=== API Response ===\n');
      console.log(response);
      console.log('\n=== End of Response ===\n');
      
      console.log('Gemini API test completed successfully with gemini-1.0-pro!');
    } catch (fallbackError) {
      console.error('Error with fallback model:', fallbackError);
    }
  }
}

// Run the test
testGeminiApi();
