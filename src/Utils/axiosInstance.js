import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000", // Your backend base URL
  baseURL: "https://plateshare-server-mu.vercel.app", // Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});
