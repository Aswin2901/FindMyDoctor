import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import Navbar from '../../../components/Navbar/Navbar.js';
import Footer from '../../../components/Footer/Footer.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    state: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/accounts/register/', {
        username: formData.email, // Use email as username
        phone: formData.phone,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        state: formData.state,
        address: formData.address,
        password: formData.password,
      });

      console.log('Registration successful', response.data);
      // Navigate to the login page after successful registration
      navigate('/login'); 
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="signup-container">
        <div className="signup-form">
          <h2>SIGN UP HERE</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="FULL NAME"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="DATE OF BIRTH"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="STATE"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="YOUR ADDRESS"
              value={formData.address}
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <div className="signup-links">
            <Link to='/login'>Already have an account?</Link><br/>
            <br/>
            <Link to='/login'>Sign up as a Doctor</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Signup;
