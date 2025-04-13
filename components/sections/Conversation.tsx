import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { suggestedTopics, questionsAnswers } from '@utils/conversationData';
import { getAIResponse } from '@utils/aiService';
import ClientOnly from '../ClientOnly';

// Message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'jacques';
  timestamp: Date;
  includeContactButton?: boolean;
}

export default function Conversation() {
  // Initial welcome message
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "Hello! I'm Jacques Evens Camille, an Executive Leadership Coach and Organizational Development Expert. Feel free to ask me about my background, services, or approach to leadership development. I can also assist with general leadership and organizational questions. How can I assist you today?",
    sender: 'jacques',
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [scrollLocked, setScrollLocked] = useState(false);

  // Function to scroll to bottom of chat container
  const scrollToBottom = () => {
    if (messagesEndRef.current && !scrollLocked) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end'
      });
    }
  };

  // Auto-scroll to bottom of messages when new messages are added
  useEffect(() => {
    // Use a short delay to ensure the DOM has updated
    const scrollTimer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(scrollTimer);
  }, [messages]);

  // Focus input when component mounts or becomes visible (disabled on initial load)
  useEffect(() => {
    // Only focus if user has interacted with the page first
    if (inView && messages.length > 1) {
      inputRef.current?.focus();
    }
  }, [inView, messages.length]);

  // Set up scroll event listener for user interaction detection
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    
    // Function to handle manual scrolling by user
    const handleScroll = () => {
      if (chatContainer) {
        // If user scrolls up, lock auto-scrolling
        const isScrolledToBottom = 
          chatContainer.scrollHeight - chatContainer.clientHeight <= 
          chatContainer.scrollTop + 50; // 50px tolerance
        
        setScrollLocked(!isScrolledToBottom);
      }
    };
    
    // Add scroll event listener
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }
    
    // Clean up event listener
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Function to handle sending a message
  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    // Check if this is a positive response to a consultation request
    const lastMessageIsJacques = messages.length > 0 && messages[messages.length - 1].sender === 'jacques';
    const isAffirmativeResponse = /^(yes|yeah|sure|absolutely|ok|okay|yep|yup|definitely|please|i would|of course|sounds good|let's do it)$/i.test(text.trim());
    const containsConsultationInvite = lastMessageIsJacques && messages[messages.length - 1].text.includes("Would you like to book a session");
    
    // Create and add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Unlock scrolling when a new message is sent
    setScrollLocked(false);

    // Special handling for affirmative responses to consultation invites
    if (containsConsultationInvite && isAffirmativeResponse) {
      const bookingResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great! I'm glad you're interested in a consultation. Please click the button below to contact me, and we can schedule a session that works for you.",
        sender: 'jacques',
        timestamp: new Date(),
        includeContactButton: true // Special flag for contact button
      };
      
      setMessages(prev => [...prev, bookingResponse]);
      setIsTyping(false);
      return;
    }

    try {
      // Generate AI response (either predefined or from Gemini API)
      const aiResponse = await getAIResponse(text);
      
      // Create and add Jacques message with AI response
      const jacquesMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'jacques',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, jacquesMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message if AI response fails
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an issue processing your request. Please try again or ask a different question.",
        sender: 'jacques',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="conversation" className="py-20 bg-gray-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 inline-block relative">
            Let's Have a Conversation
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-gold"></span>
          </h2>
          <p className="text-gray-dark max-w-3xl mx-auto text-lg">
            Ask me anything about leadership, organizational development, or my experience. 
            I can also answer general questions about leadership and business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Chat header */}
          <div className="bg-primary-blue p-4 text-white flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white mr-3">
              <Image
                src="/images/JEC.png"
                alt="Jacques Evens Camille"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold">Jacques Evens Camille</h3>
              <p className="text-xs text-blue-100">Executive Leadership Coach</p>
            </div>
          </div>
          
          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-4 bg-gray-50 relative"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'jacques' && (
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1">
                    <Image
                      src="/images/JEC.png"
                      alt="Jacques Evens Camille"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary-blue text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-dark rounded-tl-none shadow-sm'
                  }`}
                >
                  <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>
                  
                  {/* Contact button for booking requests */}
                  {message.includeContactButton && (
                    <div className="mt-3">
                      <a
                        href="#contact"
                        className="inline-block bg-primary-blue text-white px-4 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors duration-200"
                        onClick={() => {
                          // Smooth scroll to contact section
                          document.getElementById('contact')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }}
                      >
                        Contact Me
                      </a>
                    </div>
                  )}
                  
                  <ClientOnly>
                    <span className={`text-xs block mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </ClientOnly>
                </motion.div>
              </div>
            ))}
            
            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1">
                    <Image
                      src="/images/JEC.png"
                      alt="Jacques Evens Camille"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 rounded-tl-none shadow-sm">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
            
            {/* Scroll to bottom button - appears when user has scrolled up */}
            {scrollLocked && messages.length > 3 && (
              <button
                onClick={() => {
                  setScrollLocked(false);
                  scrollToBottom();
                }}
                className="absolute bottom-4 right-4 bg-primary-blue text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-200"
                aria-label="Scroll to bottom"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </button>
            )}
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-blue text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
                disabled={isTyping || !inputValue.trim()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </form>
          
          {/* Suggested topics - displaying exact predefined questions */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Predefined Questions:</p>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {questionsAnswers
                .filter(qa => qa.id !== 'default-contact' && qa.question) // Filter out the default and empty questions
                .slice(0, 12) // Limit to first 12 questions to prevent overflow
                .map((qa, index) => (
                  <button
                    key={qa.id || index}
                    onClick={() => handleSendMessage(qa.question)}
                    className="px-3 py-1 bg-white text-primary-blue text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                    disabled={isTyping}
                  >
                    {qa.question.length > 25 ? qa.question.substring(0, 22) + '...' : qa.question}
                  </button>
                ))}
            </div>
            
            <p className="text-xs text-gray-500 mt-4 mb-2">Ask me anything else:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSendMessage("What is leadership?")}
                className="px-3 py-1 bg-white text-primary-blue text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                disabled={isTyping}
              >
                What is leadership?
              </button>
              <button
                onClick={() => handleSendMessage("How do I improve team engagement?")}
                className="px-3 py-1 bg-white text-primary-blue text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                disabled={isTyping}
              >
                Team Engagement
              </button>
              <button
                onClick={() => handleSendMessage("What are recent trends in organizational development?")}
                className="px-3 py-1 bg-white text-primary-blue text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                disabled={isTyping}
              >
                OD Trends
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}