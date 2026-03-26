import axios from 'axios';

const api = axios.create({
  // In development, the proxy in vite.config.js handles /api
  // In production, we use the VITE_API_URL environment variable
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true
});

// Add a request interceptor to include the token automatically
api.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (!token) {
    token = 'guest_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ name: 'Guest User', email: 'guest@portfoliomaker.com' }));
  }

  // Aggressively sanitize token: allow only alphanumeric, underscores, and dashes
  const sanitized = token ? String(token).replace(/[^a-zA-Z0-9_-]/g, '') : '';
  
  if (config.headers.set) {
    config.headers.set('Authorization', `Bearer ${sanitized}`);
  } else {
    config.headers['Authorization'] = `Bearer ${sanitized}`;
  }
  
  return config;
});

export default api;
