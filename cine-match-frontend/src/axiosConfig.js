import axios from "axios";

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the JWT token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
