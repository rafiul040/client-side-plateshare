import axios from "axios";

// Base URL (adjust according to your backend)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // if you use cookies for auth (optional)
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    // If you decide to use Firebase JWT token for authorization later:
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Optional — can auto-handle errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { api };
