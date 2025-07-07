import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Minimize2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Azellar assistant. How can I help you with your database needs today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const predefinedResponses = [
    {
      triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      response: "Hello! Great to hear from you. I'm here to help with any questions about our database consulting services. What would you like to know?"
    },
    {
      triggers: ['pricing', 'cost', 'price', 'how much'],
      response: "Our pricing varies based on your specific needs. We offer project-based pricing starting from $3,000 for performance tuning up to $10,000+ for enterprise solutions. Would you like me to connect you with our sales team for a detailed quote?"
    },
    {
      triggers: ['services', 'what do you do', 'offerings'],
      response: "We offer comprehensive database services including consulting, performance tuning, migrations, DevOps automation, security audits, and team training. Which area interests you most?"
    },
    {
      triggers: ['support', 'help', 'assistance'],
      response: "We provide 24/7 support through our tiered plans: Standard ($2,500/month), Professional ($5,000/month), and Enterprise ($10,000/month). Each includes monitoring, maintenance, and expert assistance."
    },
    {
      triggers: ['migration', 'database migration', 'move database'],
      response: "Database migrations are one of our specialties! We handle zero-downtime migrations for all major database systems. Our process includes assessment, planning, execution, and post-migration support. What type of migration are you considering?"
    },
    {
      triggers: ['performance', 'slow', 'optimization'],
      response: "Database performance issues can significantly impact your business. We specialize in query optimization, indexing strategies, and system tuning. Our clients typically see 2-10x performance improvements. Would you like to schedule a performance assessment?"
    },
    {
      triggers: ['security', 'audit', 'compliance'],
      response: "Database security is crucial! We provide comprehensive security audits, implement encryption, access controls, and help achieve compliance with standards like HIPAA, PCI DSS, and SOC 2. What compliance requirements do you have?"
    },
    {
      triggers: ['training', 'academy', 'learn'],
      response: "Azellar Academy offers hands-on workshops covering database fundamentals, performance optimization, security, and DevOps. Our training programs are designed for teams of all skill levels. Which topics would interest your team?"
    },
    {
      triggers: ['contact', 'speak to someone', 'call', 'phone'],
      response: "I'd be happy to connect you with our team! You can reach us at +1 (555) 123-4567 or hello@azellar.com. Would you prefer a phone call or email consultation?"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const response of predefinedResponses) {
      if (response.triggers.some(trigger => lowerMessage.includes(trigger))) {
        return response.response;
      }
    }
    return "Thank you for your message! While I can help with basic questions, for specific technical requirements, I'll connect you with one of our database experts. Would you like me to arrange a consultation?";
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: findResponse(newMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "What services do you offer?",
    "How much does it cost?",
    "I need help with performance",
    "Schedule a consultation"
  ];

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-8 h-8" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300 overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-azellar-navy to-azellar-teal text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Azellar Support</h3>
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-azellar-teal text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-azellar-teal text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-azellar-aqua' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-gray-100 hover:bg-azellar-teal/10 hover:text-azellar-teal px-3 py-1 rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-azellar-teal focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="w-10 h-10 bg-azellar-teal hover:bg-azellar-navy text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;