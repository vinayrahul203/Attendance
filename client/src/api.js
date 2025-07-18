import axios from 'axios';

const API = axios.create({
  baseURL: 'https://attendance-dt62.onrender.com', // ✅ Include /api
});

export default API;
