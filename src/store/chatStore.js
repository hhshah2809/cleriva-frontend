import { create } from 'zustand';

export const useChatStore = create((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  isLoading: false,
  isTyping: false,

  setSessions: (sessions) => set({ sessions }),
  addSession: (session) => set((state) => ({ 
    sessions: [session, ...state.sessions] 
  })),
  
  setCurrentSession: (session) => set({ currentSession: session }),
  
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  updateLastMessage: (content) => set((state) => {
    const newMessages = [...state.messages];
    if (newMessages.length > 0) {
      newMessages[newMessages.length - 1].content = content;
    }
    return { messages: newMessages };
  }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsTyping: (isTyping) => set({ isTyping }),
}));
