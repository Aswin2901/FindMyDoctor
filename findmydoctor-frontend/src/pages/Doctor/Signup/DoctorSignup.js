import React, { useState } from 'react';
import axios from 'axios';
import './DoctorSignup.css';
import Navbar from '../../../components/Navbar/Navbar.js';
import Footer from '../../../components/Footer/Footer.js';
import { Link, useNavigate } from 'react-router-dom';

const DoctorSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: '',
    date_of_birth: '',
    state: '',
    address: '',
    password: '',
    confirm_password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password matching check
    if (formData.password !== formData.confirm_password) {
      setErrorMessage('Passwords do not match!');
      return; // Do not submit the form if passwords don't match
    }

    try {
      const response = await axios.post('http://localhost:8000/doctors/register/', {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        date_of_birth: formData.date_of_birth,
        state: formData.state,
        address: formData.address,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      console.log('Registration successful', response.data);
      navigate('/doctorlogin'); // Navigate to profile verification after successful registration
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <h2>DOCTOR SIGN UP HERE</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="FULL NAME"
              value={formData.full_name}
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
              name="date_of_birth"
              placeholder="DATE OF BIRTH"
              value={formData.date_of_birth}
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
              name="confirm_password"
              placeholder="CONFIRM PASSWORD"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />

            {/* Display error message if passwords do not match */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <div className="signup-links">
            <Link to='/login'>Already have an account?</Link><br />
            <br />
            <Link to='/'>Sign up as a user</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorSignup;
