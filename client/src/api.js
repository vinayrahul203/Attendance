import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Include /api
});

export default API;
