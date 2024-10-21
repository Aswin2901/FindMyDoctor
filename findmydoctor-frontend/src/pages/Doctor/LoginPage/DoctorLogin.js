import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import Navbar from '../../../components/Navbar/Navbar.js';
import Footer from '../../../components/Footer/Footer.js';
import { Link } from 'react-router-dom';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.email , formData.password)
      const response = await axios.post('http://localhost:8000/doctors/login/', {
        email: formData.email, 
        password: formData.password,
      });

      console.log('Login successful', response.data);
      // Optionally, store the token in localStorage or state management
      localStorage.setItem('access_token', response.data.access); // Save access token
      localStorage.setItem('refresh_token', response.data.refresh); // Save refresh token

      // Navigate to the home page or dashboard after successful login
      navigate('/doctordashboard'); // Change this to your actual dashboard or home route
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      <Navbar />

      <div className="login-container">
        <div className="login-form">
          <h2>LOGIN HERE</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">LOGIN</button>
          </form>
          <div className="login-links">
            <Link to='/'>Don't have an account?</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorLogin;
