import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import doctor1 from '../../Images/pixelcut-export.png';
import doctor2 from '../../Images/doctor-herp.jpg';
import doctorpatient from '../../Images/service doctor -1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    doctor1, // you can replace this with more image URLs if you want to rotate multiple images
    doctor2
  ];

  // Set up the background image change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('change');
      
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <div 
        className="hero-section"
        style={{ backgroundImage: `url(${images[currentImage]})` }} // Dynamically set the background image
      >
        <div className="hero-content">
          <h1>Find Your Personal <span>Doctor, Anytime!</span></h1>
          <div className="action-buttons">
            <div className="button">
              <FontAwesomeIcon icon={faSearch} className="icon" />
              <p>SEARCH</p>
            </div>
            <div className="button">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <p>APPOINTMENT</p>
            </div>
            <div className="button">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <p>PROFILES</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <div className="info-text">
          <h2>We're here to connect you with the right <span>Doctor</span> for your health needs.</h2>
          <button className="book-now-btn">Book Now</button>
        </div>
        <div className="info-image">
          <img src={doctorpatient} alt="Doctor and Patient" />
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Home;
