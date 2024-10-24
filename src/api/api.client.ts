// apiClient.ts
import axios from "axios";
import { apiConfig } from "./api.config";
import { getToken } from "./api.utils";

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    Accept: "*/*",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`;
      config.headers["Authorization"] = token;
      config.headers["Cookie"] = `AUTOCART-AUTH=${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
