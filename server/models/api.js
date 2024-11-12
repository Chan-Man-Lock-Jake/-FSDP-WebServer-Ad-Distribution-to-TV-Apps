import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Your Node.js backend URL
});

export const signupUser = (userData) => API.post('/signup', userData);

export default API;
