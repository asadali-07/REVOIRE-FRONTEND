import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ShoppingBag,
  Heart,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {messages,socket,setMessages,isTyping, setTyping}=useAuthStore();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick action buttons
  const quickActions = [
    { icon: Package, label: 'Track Orders', action: 'track' },
    { icon: ShoppingBag, label: 'Products', action: 'products' },
    { icon: Heart, label: 'Wishlist', action: 'wishlist' },
    { icon: ShoppingCart, label: 'Cart', action: 'cart' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  

  const handleSendMessage = (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: message,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    socket?.emit("message", message.trim());
    setInputMessage('');
    setTyping(true);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      track: 'Show me my recent orders',
      products: ' Get some products',
      wishlist: "Get my wishlist",
      cart: 'Get my cart',
    };
    handleSendMessage(actionMessages[action]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-black flex items-center justify-center shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
          >
            <MessageCircle size={24} strokeWidth={1.5} />
            
            {/* Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-white"
            />
            
            {/* Online Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-96 h-[600px] max-h-[85vh] bg-black border border-white/20 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white flex items-center justify-center">
                  <Bot size={20} className="text-black" strokeWidth={1.5} />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="text-white font-light tracking-[0.15em] text-sm">
                    ASSISTANT
                  </h3>
                  <p className="text-white/40 text-xs font-light tracking-wider">
                    Online
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                <X size={16} className="text-white/60" strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 shrink-0 flex items-center justify-center ${
                        message.type === 'bot'
                          ? 'bg-white text-black'
                          : 'bg-white/10 border border-white/20 text-white'
                      }`}
                    >
                      {message.type === 'bot' ? (
                        <Bot size={14} strokeWidth={1.5} />
                      ) : (
                        <User size={14} strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex-1 max-w-[75%]">
                      <div
                        className={`p-3 ${
                          message.type === 'bot'
                            ? ' bg-zinc-950 border border-white/10 text-white'
                            : 'bg-white text-black border-zinc/10'
                        }`}
                      >
                        <p className="text-sm font-light tracking-wide leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      <p className="text-white/30 text-xs font-light tracking-wider mt-1">
                        {message.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                      <Bot size={14} strokeWidth={1.5} className="text-black" />
                    </div>
                    <div className="p-3 bg-zinc-950 border border-white/10">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="w-1.5 h-1.5 bg-white/40 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 border-t border-white/10 bg-zinc-950/50"
              >
                <p className="text-white/50 text-xs font-light tracking-[0.15em] uppercase mb-3">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.action}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center gap-2 p-2.5 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                    >
                      <action.icon size={14} className="text-white/60" strokeWidth={1.5} />
                      <span className="text-white/60 text-xs font-light tracking-wider">
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-zinc-950 border border-white/10 text-white placeholder:text-white/30 font-light tracking-wide text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="w-11 h-11 bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={16} strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;