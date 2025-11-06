// src/api.js

// Base URL: empty for dev (use Vite proxy), production URL from env
export const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL // production
  : ""; // development (proxy)
