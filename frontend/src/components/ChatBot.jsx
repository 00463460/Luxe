import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader } from 'lucide-react';
import chatbotService from '../services/chatbotService';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 I\'m LUXE Assistant. I can help you with questions about our perfumes, clothing, shipping, and more. What can I help you with today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from backend
      const response = await chatbotService.askQuestion(inputValue);

      const botMessage = {
        id: messages.length + 2,
        text: response.answer,
        sender: 'bot',
        timestamp: new Date(),
        confidence: response.confidence
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again or contact our support team at support@luxebrand.com',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Hello! 👋 I\'m LUXE Assistant. I can help you with questions about our perfumes, clothing, shipping, and more. What can I help you with today?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md bg-dark-main border border-white/30 rounded-2xl shadow-2xl flex flex-col z-50 h-96 md:h-[500px] overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-white via-gray-200 to-white text-black p-4 rounded-t-2xl flex justify-between items-center border-b border-white/30 flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-black" />
              <h3 className="font-semibold text-black">LUXE Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black/10 rounded-full transition"
            >
              <X size={20} className="text-black" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-dark-main">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                       ? 'bg-white text-black rounded-br-none'
                       : 'bg-dark-card text-white border border-white/30 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.confidence && message.sender === 'bot' && (
                    <p className="text-xs mt-1 text-white opacity-70">
                      Confidence: {Math.round(message.confidence * 100)}%
                    </p>
                  )}
                  <p className="text-xs mt-1 opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-card text-white border border-white/30 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-white/30 p-4 bg-dark-card flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow px-3 py-2 bg-dark-main border border-white/20 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 text-sm transition-all duration-300 disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleClearChat}
              className="text-xs text-text-muted hover:text-white mt-2 w-full text-center py-1 transition-colors"
            >
              Clear chat
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-white text-black rounded-full shadow-2xl hover:shadow-white-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50 border-2 border-white animate-bounce"
          title="Chat with LUXE Assistant"
        >
          <MessageCircle size={28} className="text-black" />
        </button>
      )}
    </>
  );
}
