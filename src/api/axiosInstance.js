import axios from "axios";
import { API_BASE_URL } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies (logout/session)
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for generic error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here if needed (e.g., 401 Unauthorized redirect)
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
