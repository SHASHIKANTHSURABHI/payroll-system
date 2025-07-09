import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://payroll-system-jp4s.onrender.com/api/'
    : 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  }
   // 🔥 CRITICAL: allow cookies to be sent with requests
});

export default api;
