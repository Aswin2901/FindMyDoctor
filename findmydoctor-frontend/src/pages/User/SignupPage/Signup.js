import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import Navbar from '../../../components/Navbar/Navbar.js';
import Footer from '../../../components/Footer/Footer.js';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

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

  const [errorMessages, setErrorMessages] = useState(''); // For displaying error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages(''); 

    if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      setErrorMessages('Mobile number must be exactly 10 digits.');
      return; 
    }


    if (formData.password !== formData.confirmPassword) {
      setErrorMessages("Passwords don't match.");
      return;
    }

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

      // Navigate to login and pass success message as state
      navigate('/login', { state: { message: 'Signup successful! Please log in.' } });
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      
      // Display error messages from the API response
      if (error.response && error.response.data) {
        setErrorMessages(error.response.data);
      } else {
        setErrorMessages('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <h2>SIGN UP HERE</h2>

          {/* Display error messages if any */}
          {errorMessages && <div className="error-message">{errorMessages}</div>}

          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                placeholder="PHONE"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Gender:
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
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                placeholder="DATE OF BIRTH"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                placeholder="STATE"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                placeholder="YOUR ADDRESS"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                placeholder="CONFIRM PASSWORD"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <div className="signup-links">
            <Link to="/login">Already have an account?</Link><br /><br />
            <Link to="/doctorsignup">Sign up as a Doctor</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
