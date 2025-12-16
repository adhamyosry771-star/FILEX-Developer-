import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { t, language, dir } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current || messages.length === 0) {
      setMessages([{ role: 'model', text: t('chat.initial') }]);
      initialized.current = true;
    }
  }, [t, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const responseText = await sendMessageToGemini(userText, language);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: t('chat.error'), isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const getUserBubbleClass = () => dir === 'rtl' ? 'rounded-tl-none' : 'rounded-tr-none';
  const getModelBubbleClass = () => dir === 'rtl' ? 'rounded-tr-none' : 'rounded-tl-none';

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
          isOpen ? 'bg-ink rotate-90' : 'bg-gold hover:bg-ink text-white'
        }`}
      >
        {isOpen ? <X className="text-white w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className={`fixed bottom-28 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-50 w-[90vw] md:w-[380px] h-[500px] bg-white border border-black/5 rounded-xl shadow-2xl flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className="p-4 bg-paper border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-ink text-sm tracking-wide">{t('chat.title')}</h3>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1">
                   {t('chat.online')}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-ink">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-ink' : 'bg-gold/10'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gold" />}
                </div>
                <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? `bg-ink text-white ${getUserBubbleClass()}` 
                    : `bg-white text-ink border border-black/5 ${getModelBubbleClass()}`
                } ${msg.isError ? 'border-red-200 bg-red-50 text-red-600' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-gold/10 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gold" />
                 </div>
                 <div className={`bg-white border border-black/5 rounded-lg ${getModelBubbleClass()} px-4 py-3 flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-black/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={`p-2.5 bg-gold rounded-full text-white hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${dir === 'rtl' ? 'rotate-180' : ''}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;