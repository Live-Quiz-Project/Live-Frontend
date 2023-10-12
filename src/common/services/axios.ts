import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "",
});

const ws = axios.create({
  baseURL: import.meta.env.VITE_WEBSOCKET_URL || "",
});

const jsonServer = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_URL || "",
});

export { http, ws, jsonServer };
