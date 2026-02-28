import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Shared axios instance.
 * The Authorization header is injected dynamically by useClerkAxios (see
 * src/hooks/useClerkAxios.ts), which registers a request interceptor every
 * time a signed-in user mounts the Layout component.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
