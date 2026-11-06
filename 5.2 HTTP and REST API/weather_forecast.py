import { useState, useEffect } from 'react';

const defaultCities = [
  { name: 'Kuala Lumpur', latitude: 3.139, longitude: 101.6869 },
  { name: 'Kota Kinabalu', latitude: 5.9804, longitude: 116.0735 },
  { name: 'Kuching', latitude: 1.5535, longitude: 110.3593 },
];

const HOT = 35;   // alert when the daily maximum reaches this temperature (°C)
const WINDY = 30; // alert when wind speed reaches this speed (km/h)

function WeatherForecast() {
  const [cities, setCities] = useState(defaultCities);
  const [selected, setSelected] = useState(0);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usingCache, setUsingCache] = useState(false);
  const [newCity, setNewCity] = useState({ name: '', latitude: '', longitude: '' });

  const city = cities[selected];

  // Fetch current weather + 7-day forecast whenever the selected city changes
  useEffect(() => {
    if (!city) return;
    let ignore = false;
    const cacheKey = `weather-${city.latitude}-${city.longitude}`;

    const loadWeather = async () => {
      setLoading(true);
      setError('');
      setUsingCache(false);
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
          '&current_weather=true&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify(data)); // save for offline use
        if (!ignore) setWeather(data);
      } catch (err) {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !ignore) {
          setWeather(JSON.parse(cached));
          setUsingCache(true);
        } else if (!ignore) {
          setWeather(null);
          setError(`Could not load weather: ${err.message}`);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadWeather();
    return () => { ignore = true; };
  }, [city]);

  // Geolocation: add the user's position as a tracked city
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCities(prev => [...prev, {
          name: 'My Location',
          latitude: Number(position.coords.latitude.toFixed(4)),
          longitude: Number(position.coords.longitude.toFixed(4)),
        }]);
        setSelected(cities.length);
      },
      () => setError('Location permission was denied.')
    );
  };

  const addCity = (e) => {
    e.preventDefault();
    if (!newCity.name.trim() || newCity.latitude === '' || newCity.longitude === '') return;
    setCities(prev => [...prev, {
      name: newCity.name.trim(),
      latitude: Number(newCity.latitude),
      longitude: Number(newCity.longitude),
    }]);
    setNewCity({ name: '', latitude: '', longitude: '' });
  };

  const removeCity = (index) => {
    setCities(prev => prev.filter((c, i) => i !== index));
    setSelected(0);
  };

  // Alerts calculated from the loaded data
  const alerts = [];
  if (weather) {
    if (weather.current_weather.windspeed >= WINDY) {
      alerts.push(`Strong wind: ${weather.current_weather.windspeed} km/h`);
    }
    weather.daily.time.forEach((day, i) => {
      if (weather.daily.temperature_2m_max[i] >= HOT) {
        alerts.push(`Heat warning on ${day}: ${weather.daily.temperature_2m_max[i]}°C`);
      }
    });
  }

  return (
    <div>
      <h2>Weather Forecast</h2>

      <div>
        {cities.map((c, index) => (
          <span key={`${c.name}-${index}`} style={{ marginRight: 8 }}>
            <button
              onClick={() => setSelected(index)}
              style={{ fontWeight: index === selected ? 'bold' : 'normal' }}
            >
              {c.name}
            </button>
            {cities.length > 1 && <button onClick={() => removeCity(index)} title="Remove city">x</button>}
          </span>
        ))}
        <button onClick={useMyLocation}>📍 Use my location</button>
      </div>

      <form onSubmit={addCity} style={{ marginTop: 8 }}>
        <input placeholder="City name" value={newCity.name} onChange={(e) => setNewCity({ ...newCity, name: e.target.value })} />
        <input type="number" step="any" placeholder="Latitude" value={newCity.latitude} onChange={(e) => setNewCity({ ...newCity, latitude: e.target.value })} />
        <input type="number" step="any" placeholder="Longitude" value={newCity.longitude} onChange={(e) => setNewCity({ ...newCity, longitude: e.target.value })} />
        <button type="submit">Add City</button>
      </form>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {usingCache && <p style={{ color: 'orange' }}>Offline or unavailable: showing the last saved forecast.</p>}

      {weather && !loading && (
        <div>
          <h3>{city.name}: now</h3>
          <p>Temperature: {weather.current_weather.temperature}°C</p>
          <p>Windspeed: {weather.current_weather.windspeed} km/h</p>

          {alerts.length > 0 && (
            <div style={{ border: '1px solid red', padding: 8 }}>
              <strong>⚠️ Alerts</strong>
              <ul>{alerts.map(alert => <li key={alert}>{alert}</li>)}</ul>
            </div>
          )}

          <h3>7-day forecast</h3>
          <ul>
            {weather.daily.time.map((day, i) => (
              <li key={day}>
                {day}: {weather.daily.temperature_2m_min[i]}°C to {weather.daily.temperature_2m_max[i]}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
