import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, DollarSign, X } from 'lucide-react';
import { ChatMessage, AnalysisResult } from '../types';
import { createNegotiationSession } from '../services/geminiService';
import type { Chat, GenerateContentResponse } from '@google/genai';

interface NegotiationChatProps {
  analysis: AnalysisResult;
  onClose: () => void;
}

export const NegotiationChat: React.FC<NegotiationChatProps> = ({ analysis, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Chat
  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      try {
        const session = createNegotiationSession(JSON.stringify(analysis));
        setChatSession(session);

        // Initial Greeting from AI
        const response: GenerateContentResponse = await session.sendMessage({
          message: `The startup is "${analysis.companyName}". Score is ${analysis.score}. Summary: ${analysis.summary}. Start the negotiation.`
        });
        
        if (response.text) {
          setMessages([
            {
              id: 'init',
              role: 'model',
              text: response.text,
              timestamp: new Date()
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to start chat", error);
        setMessages([
            {
              id: 'error',
              role: 'model',
              text: "System Error: Unable to initiate negotiation protocols. Check your API Key.",
              timestamp: new Date()
            }
          ]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg.text });
      const aiText = result.text;

      if (aiText) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: aiText,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="w-full max-w-4xl h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Ventura AI Negotiator</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Negotiation Session
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${msg.role === 'user' ? 'bg-cyan-500/20' : 'bg-emerald-500/20'}`}>
                  {msg.role === 'user' ? <User size={14} className="text-cyan-400" /> : <DollarSign size={14} className="text-emerald-400" />}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none shadow-lg'
                  }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start w-full">
               <div className="flex max-w-[80%] gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                   <Bot size={14} className="text-emerald-400" />
                 </div>
                 <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                   <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                   <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your reply regarding equity, profit, or vision..."
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};