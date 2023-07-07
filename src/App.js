import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [getData, setGetData] = useState(null);
  const [city, setCity] = useState('pune');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('No Such Place Exists!');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=6465c4743b6d44a0b9025217230707&q=${city}&aqi=no`
        );
        const data = await response.json();
        setGetData(data);
      } catch (error) {
        setGetData(null);
        setMessage('No data found for the entered city.');
      }
    };

    fetchData();
  }, [city]);

  const myCity = () => {
    if (input !== '') {
      setCity(input);
    }
  };

  return (
    <>
      <nav className='search'>
        <h3>
          <span className='zee'>Z</span>Weather
        </h3>
        <input
          className='search-input'
          type='text'
          onChange={(e) => {
            setInput(e.target.value.toUpperCase());
          }}
        />
        <button className='btn' onClick={myCity}>
          Search
        </button>
       {getData && getData.location ? ( null  ):<div className='message'>{message}</div>}
      </nav>

     
    
      
      

      {getData && getData.location ? (
        <div className='card'>
          <div className='card-header'>
            <h2>{getData.location.name}</h2>
            <p>
              {getData.location.region}, {getData.location.country}
            </p>
            <p>Local Time: {getData.location.localtime}</p>
          </div>
          <div className='card-body'>
            <img
              src={`https:${getData.current.condition.icon}`}
              alt='Weather Icon'
            />
            <p>
              Temperature: {getData.current.temp_c}°C (
              {getData.current.temp_f}°F)
            </p>
            <p>Condition: {getData.current.condition.text}</p>
            <p>
              Wind: {getData.current.wind_kph} km/h from the{' '}
              {getData.current.wind_dir}
            </p>
            <p>
              Pressure: {getData.current.pressure_mb} mb (
              {getData.current.pressure_in} in)
            </p>
            <p>Humidity: {getData.current.humidity}%</p>
            <p>
              Visibility: {getData.current.vis_km} km (
              {getData.current.vis_miles} miles)
            </p>
          </div>
        </div>
        
      ) : 
      <div>
        <img className='image' src="https://thumbs.dreamstime.com/b/abandoned-house-spooky-place-dilapidated-building-error-page-not-found-message-concept-old-boarded-up-windows-door-96325361.jpg" alt="" />
      </div> }
      <footer className="footer">
      <div className="footer-content">
        <h3>Muhammad Zeeshan Zia   2023 Company Name. All rights reserved.</h3>
      
      </div>
    </footer>
    </>
  );
}

export default App;
