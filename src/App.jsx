import { useState } from "react"; // We import the 'memory' function from React
import "./App.css";

function App() {
  // 1. Create state for the city name (starts as an empty string)
  const [city, setCity] = useState("");

  // 2. Create state for the weather data (starts as null/empty)
  const [weather, setWeather] = useState(null);

  //function that will talk to the Weather API
  const searchWeather = () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data); // Save the data into our 'memory'
      });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city..."
          onChange={(e) => setCity(e.target.value)} // Update 'city' state as you type
          onKeyDown={(e) => e.key === "Enter" && searchWeather()} // Calls search on Enter
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      {/* 4. Only show the weather info if we actually have data */}
      {weather && weather.cod === 200 && (
        <div className="result">
          <h3>{weather.name}</h3>

          {/* This line fetches the icon based on the data */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
