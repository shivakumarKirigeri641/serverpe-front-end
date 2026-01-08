import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Public pages that don't require auth
      const publicPaths = [
        '/auth',
        '/privacy-policy',
        '/terms-and-conditions',
        '/refund-policy',
        '/disclaimer',
        '/projects',
        '/'
      ];
      
      // Only redirect to /auth if not on a public page
      const currentPath = window.location.pathname;
      const isPublicPage = publicPaths.some(path => currentPath.startsWith(path));
      
      if (!isPublicPage) {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
