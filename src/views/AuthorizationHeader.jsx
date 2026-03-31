import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./apiConfig";

const AuthorizationHeader = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the Authorization header with the token
AuthorizationHeader.interceptors.request.use(
  (config) => {
    const token = Cookies.get("AuthorizationToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AuthorizationHeader;
