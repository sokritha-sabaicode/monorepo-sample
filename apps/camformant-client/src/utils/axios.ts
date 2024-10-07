import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Prefix with base URL
  withCredentials: true, // Include cookies in the request
});

export default axiosInstance