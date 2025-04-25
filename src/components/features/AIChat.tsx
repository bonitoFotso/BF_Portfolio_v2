import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, 
  Code, Brain, ChevronRight, Maximize2, Minimize2 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  category?: 'greeting' | 'project' | 'skill' | 'general';
}

interface Suggestion {
  text: string;
  action: () => void;
}

const AIChat = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Suggestions for quick actions
  const suggestions: Suggestion[] = [
    {
      text: t('chat.suggestions.projects'),
      action: () => handleUserMessage(t('chat.suggestions.projects'))
    },
    {
      text: t('chat.suggestions.skills'),
      action: () => handleUserMessage(t('chat.suggestions.skills'))
    },
    {
      text: t('chat.suggestions.contact'),
      action: () => handleUserMessage(t('chat.suggestions.contact'))
    }
  ];
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initial greeting when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: t('chat.greeting'),
        category: 'greeting'
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length, t]);
  
  // Handle user message submission
  const handleUserMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(content),
        category: 'general'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };
  
  // Generate AI response based on user input
  const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('project') || lowercaseInput.includes('work')) {
      return t('chat.responses.projects');
    }
    
    if (lowercaseInput.includes('skill') || lowercaseInput.includes('tech')) {
      return t('chat.responses.skills');
    }
    
    if (lowercaseInput.includes('contact') || lowercaseInput.includes('hire')) {
      return t('chat.responses.contact');
    }
    
    return t('chat.responses.default');
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg",
          "hover:bg-primary/90 transition-colors z-50",
          isOpen && "hidden"
        )}
      >
        <MessageSquare size={24} />
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-800",
              "rounded-lg shadow-xl overflow-hidden z-50 flex flex-col",
              "border border-gray-200 dark:border-gray-700"
            )}
          >
            {/* Chat header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex items-start gap-3",
                      message.type === 'user' && "flex-row-reverse"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.type === 'bot' 
                        ? "bg-primary/10 text-primary" 
                        : "bg-gray-100 dark:bg-gray-700"
                    )}>
                      {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    
                    <div className={cn(
                      "rounded-lg p-3 max-w-[80%]",
                      message.type === 'bot'
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "bg-primary text-white"
                    )}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
            
            {/* Quick suggestions */}
            {!isMinimized && messages.length === 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {t('chat.suggestions.title')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={suggestion.action}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ChevronRight size={14} />
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat input */}
            {!isMinimized && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserMessage(inputValue);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t('chat.input.placeholder')}
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;