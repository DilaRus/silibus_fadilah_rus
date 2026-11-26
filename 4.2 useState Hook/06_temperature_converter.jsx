/*
Exercise 1: Temperature Converter
Task: Build a component that converts between Celsius and Fahrenheit
  - Two input fields (Celsius and Fahrenheit)
  - Real-time conversion as user types
  - Proper state management for both values
*/
import { useState } from 'react';

function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  // Typing in Celsius updates both fields
  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    setFahrenheit(value === '' ? '' : ((value * 9) / 5 + 32).toFixed(2));
  };

  // Typing in Fahrenheit updates both fields
  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    setCelsius(value === '' ? '' : (((value - 32) * 5) / 9).toFixed(2));
  };

  return (
    <div>
      <h2>Temperature Converter</h2>
      <label>
        Celsius:
        <input type="number" value={celsius} onChange={handleCelsiusChange} />
      </label>
      <br />
      <label>
        Fahrenheit:
        <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} />
      </label>
    </div>
  );
}

export default TemperatureConverter;
