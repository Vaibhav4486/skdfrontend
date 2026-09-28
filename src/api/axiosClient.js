import axios from 'axios';

// Falls back to the deployed Render URL if no .env is present, so this
// works out of the box even before you copy .env.example to .env.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://skdfinance-backend.onrender.com';

const axiosClient = axios.create({ baseURL });

// Attaches the JWT to every outgoing request automatically, if one exists.
// This is why public endpoints (leads, testimonials) still end up linked
// to a logged-in user's account on the backend — same token, every call.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('skd_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global 401 handling: if the backend ever says our token is invalid or
// expired, clear it out so the app doesn't keep sending a dead token.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('skd_token');
      localStorage.removeItem('skd_user');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
