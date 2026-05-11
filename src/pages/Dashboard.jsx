import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

import { chatService } from '../services/chatService';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    messages,
    setMessages,
    addMessage,
    isTyping,
    setIsTyping,
    setCurrentSession,
    addSession
  } = useChatStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // =========================
  // LOAD MESSAGES (FIXED)
  // =========================
  useEffect(() => {
    const loadSession = async () => {
      if (!sessionId) {
        setMessages([]);
        setCurrentSession(null);
        return;
      }

      try {
        const data = await chatService.getMessages(sessionId);

        setMessages(data.messages || []);
        setCurrentSession({ id: sessionId });

      } catch (error) {
        console.log(error);
        toast.error('Failed to load conversation');
        navigate('/dashboard');
      }
    };

    loadSession();
  }, [sessionId]);

  // =========================
  // SEND MESSAGE (FIXED)
  // =========================
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      created_at: new Date().toISOString()
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(sessionId, userMessage.content);

      const newSession = response.session;

      // If new session → update route safely
      if (!sessionId && newSession) {
        addSession(newSession);
        setCurrentSession(newSession);

        setTimeout(() => {
          navigate(`/chat/${newSession.id}`);
        }, 0);
      }

      // SAFE message handling
      const aiMessage = response.message;

      addMessage({
        id: aiMessage.id,
        role: aiMessage.role,
        content: aiMessage.content,
        created_at: aiMessage.created_at
      });

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.error ||
        error.message ||
        'Failed to send message'
      );
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="flex flex-col h-full bg-white relative">

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6 pb-24">

          {messages.length === 0 && !isTyping ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-20"
            >
              <div className="bg-primary-50 p-4 rounded-2xl mb-6 inline-block">
                <Bot className="w-12 h-12 text-primary-600" />
              </div>

              <h2 className="text-2xl font-bold">
                Welcome {user?.name || 'Founder'}
              </h2>

              <p className="text-gray-500 mt-2">
                Ask anything about your business
              </p>
            </motion.div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >

                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-xl ${msg.role === 'user'
                        ? 'bg-gray-100'
                        : 'bg-white border shadow-sm'
                      }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}

                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg" />
                  <div className="bg-white border px-4 py-3 rounded-xl">
                    Typing...
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="p-4 border-t bg-white">
        <div className="max-w-4xl mx-auto flex gap-2">

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            className="flex-1 border rounded-xl p-3 resize-none"
            rows={1}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary-600 text-white px-4 rounded-xl"
          >
            <Send />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;