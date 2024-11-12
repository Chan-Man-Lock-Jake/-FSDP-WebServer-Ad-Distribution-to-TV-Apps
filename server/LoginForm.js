import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    Username: '',
    UserPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials);
      if (response.data.success) {
        alert('Login successful!');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" name="Username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="UserPassword" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
