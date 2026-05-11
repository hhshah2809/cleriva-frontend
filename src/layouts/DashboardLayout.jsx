import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bot, MessageSquarePlus, Settings, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chatService';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const { sessions, setSessions, currentSession, setCurrentSession } = useChatStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await chatService.getSessions();
        setSessions(data);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      }
    };
    fetchSessions();
  }, [setSessions]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNewChat = () => {
    setCurrentSession(null);
    navigate('/dashboard');
    setIsSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-surface-200">
        <Link to="/dashboard" className="flex items-center gap-2 mb-6">
          <div className="bg-primary-600 p-1.5 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-surface-900">
            Clariva<span className="text-primary-600">.ai</span>
          </span>
        </Link>
        
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-xl font-medium transition-colors shadow-soft"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto chat-scrollbar p-2 space-y-1">
        <div className="text-xs font-semibold text-surface-400 uppercase tracking-wider px-3 py-2 mt-2">
          Previous Sessions
        </div>
        {sessions.map((session) => (
          <Link
            key={session.id}
            to={`/chat/${session.id}`}
            onClick={() => {
              setCurrentSession(session);
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              location.pathname === `/chat/${session.id}` || currentSession?.id === session.id
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-surface-600 hover:bg-surface-100'
            }`}
          >
            <MessageSquare className={`w-4 h-4 ${location.pathname === `/chat/${session.id}` ? 'text-primary-500' : 'text-surface-400'}`} />
            <span className="truncate">{session.title || 'Conversation'}</span>
          </Link>
        ))}
        {sessions.length === 0 && (
          <div className="px-3 py-4 text-sm text-surface-400 text-center italic">
            No previous sessions
          </div>
        )}
      </div>

      <div className="p-4 border-t border-surface-200 space-y-1">
        <Link
          to="/profile"
          onClick={() => setIsSidebarOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
            location.pathname === '/profile'
              ? 'bg-surface-200 text-surface-900 font-medium'
              : 'text-surface-600 hover:bg-surface-100'
          }`}
        >
          <Settings className="w-4 h-4 text-surface-500" />
          Business Profile
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-900/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-surface-50 border-r border-surface-200 transform lg:transform-none transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-surface-200 bg-white">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-surface-900">
              Clariva
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-surface-600 hover:bg-surface-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
