/*
Exercise 1: Weather Dashboard
Task: Build a weather dashboard with conditional rendering
Requirements:
  - Display different weather icons based on conditions
  - Show/hide detailed forecast based on user preference
  - Conditional styling for temperature ranges
  - Loading states and error handling
  - Empty state when no location is selected
*/
import { useState } from 'react';

const locations = {
  melaka: { name: 'Melaka', condition: 'sunny', temperature: 34, forecast: 'Clear skies all day, stay hydrated.' },
  sabah: { name: 'Sabah', condition: 'rainy', temperature: 26, forecast: 'Heavy rain in the afternoon, bring an umbrella.' },
  sarawak: { name: 'Sarawak', condition: 'cloudy', temperature: 29, forecast: 'Cloudy with a chance of light showers.' },
  cameron: { name: 'Cameron Highlands', condition: 'cloudy', temperature: 18, forecast: 'Cool and misty in the evening.' },
  broken: { name: 'Unreachable Station', condition: 'error' }, // used to demonstrate the error state
};

const icons = { sunny: '☀️', rainy: '🌧️', cloudy: '☁️' };

function WeatherDashboard() {
  const [selected, setSelected] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSelect = (e) => {
    const key = e.target.value;
    setSelected(key);
    setWeather(null);
    setError('');
    setShowDetails(false);

    if (key === '') return; // back to the empty state

    setIsLoading(true);
    // Simulate a request to a weather API
    setTimeout(() => {
      const result = locations[key];
      if (result.condition === 'error') {
        setError(`Could not load weather for ${result.name}. Please try again.`);
      } else {
        setWeather(result);
      }
      setIsLoading(false);
    }, 1000);
  };

  // Temperature colour: cold < 22, warm 22 to 30, hot > 30
  const temperatureColor = (temp) => {
    if (temp > 30) return 'red';
    if (temp >= 22) return 'orange';
    return 'blue';
  };

  return (
    <div>
      <h2>Weather Dashboard</h2>
      <select value={selected} onChange={handleSelect}>
        <option value="">-- Select Location --</option>
        {Object.entries(locations).map(([key, location]) => (
          <option key={key} value={key}>{location.name}</option>
        ))}
      </select>

      {selected === '' && <p>No location selected. Choose a location to see its weather.</p>}

      {isLoading && <p>Loading weather...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!isLoading && weather && (
        <div>
          <h3>{icons[weather.condition]} {weather.name}</h3>
          <p>Condition: {weather.condition}</p>
          <p style={{ color: temperatureColor(weather.temperature), fontWeight: 'bold' }}>
            Temperature: {weather.temperature}°C
          </p>
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide Forecast' : 'Show Forecast'}
          </button>
          {showDetails && <p>Detailed Forecast: {weather.forecast}</p>}
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
