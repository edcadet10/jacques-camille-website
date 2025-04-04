# Gemini API Integration for Jacques Camille's Website

This document explains how the Gemini API has been integrated with Jacques' website to power the chat functionality.

## Overview

The chat functionality on Jacques' website is now powered by:

1. **Jacques-specific responses**: For questions about Jacques, his background, experience, services, etc., the website uses pre-defined responses from the `conversationData.ts` file.

2. **Gemini API**: For general questions about leadership, business, organizational development, etc., the website uses Google's Gemini AI API to generate responses.

## How It Works

### 1. Question Classification

When a user asks a question, the system first determines if it's about Jacques or a general topic:

- If the question contains keywords related to Jacques (name, background, services, etc.), it uses the pre-defined responses.
- If the question is about general topics, it uses the Gemini API to generate a response.

### 2. API Integration

The Gemini API integration is implemented in the `aiService.ts` file, which includes:

- `isJacquesRelatedQuestion()`: Determines if a question is about Jacques
- `generateGeminiResponse()`: Calls the Gemini API to generate responses
- `getAIResponse()`: Combines the above functionality to return appropriate responses

### 3. Testing

A test script (`testGeminiApi.js`) is provided to verify the Gemini API connection.

## Implementation Details

### Models Used

- Primary Model: `gemini-1.5-pro`
- Fallback Model: `gemini-1.0-pro` (used if the primary model fails)

### API Key Management

- The API key is currently hardcoded in the `aiService.ts` file
- **IMPORTANT**: For production, this should be moved to environment variables

## Usage Guidelines

1. Jacques-specific questions should be handled by the pre-defined responses to ensure consistent and accurate information.
2. General questions can leverage the power of the Gemini API to provide helpful responses.
3. The Gemini API responses are formatted to maintain Jacques' professional tone and style.

## Limitations

1. The Gemini API may occasionally generate responses that don't align perfectly with Jacques' expertise or approach. The system tries to mitigate this with careful prompting.
2. API calls may sometimes fail due to connectivity issues or rate limits. The system includes fallback behavior.

## Future Improvements

1. Move the API key to environment variables
2. Implement rate limiting to prevent abuse
3. Add more sophisticated question classification for edge cases
4. Implement feedback mechanisms to improve response quality over time
5. Add a caching layer to reduce API calls for common questions

## Need Help?

If you encounter any issues with the AI integration, please refer to the Google Generative AI documentation or contact the development team for support.
