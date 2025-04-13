/**
 * Data Access Layer
 * 
 * This module consolidates all data access functions and services
 * to ensure consistent data handling and security practices.
 */

// Export AI services with sanitized input handling
export { 
  getAIResponse, 
  isPredefinedQuestion, 
  getPredefinedAnswer 
} from './aiService';

// Export conversation data
export { 
  questionsAnswers, 
  suggestedTopics, 
  findBestMatch 
} from './conversationData';
