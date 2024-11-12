import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [user, setUser] = useState({
    UserID: '',
    Username: '',
    UserPassword: '',
    UserFullName: '',
    UserCtcNo: '',
    UserEmail: '',
    UserRole: 'User', // Default to 'User' role
    Company: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/addUser', user); // Posting data to addUser route
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="UserID" placeholder="User ID (e.g., ACC0000001)" onChange={handleChange} required />
      <input type="text" name="Username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="UserPassword" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="UserFullName" placeholder="Full Name" onChange={handleChange} required />
      <input type="tel" name="UserCtcNo" placeholder="Contact Number" onChange={handleChange} required />
      <input type="email" name="UserEmail" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="Company" placeholder="Company" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
