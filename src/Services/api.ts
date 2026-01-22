import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.seusistema.com" // URL de produção
    : "http://localhost:8080"; // URL de desenvolvimento

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Sessão expirada ou inválida.");
      
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/";
    }
    
    console.error("Erro na requisição API:", error);
    return Promise.reject(error);
  }
);

export default api;
