import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://192.168.2.20:3000", // à remplacer par ton env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

// Optionnel : intercepteurs pour log ou token
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.message);
    return Promise.reject(error);
  }
);
