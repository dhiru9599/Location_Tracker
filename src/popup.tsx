import React, { useState } from 'react';
import './style.css'; // Import your Tailwind CSS classes here
import dotenv from 'dotenv';

// Load environment variables from .env using dotenv
dotenv.config();

const Popup = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');

  const fetchLocation = async () => {
    setLoading(true);

    try {
      const ipAddressResponse = await fetch('https://api.ipify.org?format=json');
      const ipAddressData = await ipAddressResponse.json();
      const userIp = ipAddressData.ip;

      const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

      const locationResponse = await fetch(`https://ipinfo.io/${userIp}/json?token=${accessToken}`);
      const locationData = await locationResponse.json();

      console.log('locationData:', locationData); // Debug log to see the locationData structure

      const country = locationData.country;
      const city = locationData.city;

      setLocation(`Your country is ${country} and city is ${city}`);
    } catch (error) {
      console.error('Error fetching location:', error);
    }

    setLoading(false);
  };

  return (
    <div className="popup-container">
      <button
        className={`btn ${loading ? 'btn-loading' : ''}`}
        onClick={fetchLocation}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Show my location'}
      </button>
      {location && <p className="location-text">{location}</p>}
    </div>
  );
};

export default Popup;
