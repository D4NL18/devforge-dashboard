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
  timeout: 10000, // 10 segundos de timeout
});

// Interceptador de requisições
api.interceptors.request.use(
  (config) => {
    // Exemplo: inserir token futuramente
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador de respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição API:", error);
    return Promise.reject(error);
  }
);

export default api;
