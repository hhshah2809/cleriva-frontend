import api from './api';

export const chatService = {

  getSessions: async () => {
    const response = await api.get('/chat/sessions');
    return response.data;
  },

  getMessages: async (sessionId) => {
    const response = await api.get(`/messages/${sessionId}`);
    return response.data;
  },

  sendMessage: async (sessionId, content) => {
    const response = await api.post('/chat', {
      sessionId,
      message: content
    });

    return response.data;
  }
};