import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import.meta.env.VITE_BACKEND_URL
const api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL/api ||
    'http://localhost:5000/api',

  // IMPORTANT:
  // DO NOT set Content-Type globally
});


// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;