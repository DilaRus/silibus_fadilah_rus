import { useState, useEffect } from 'react';

const THRESHOLD = 80; // usage above this percentage raises an alert

function SystemDashboard() {
  // Start from the last saved values (data persistence)
  const [cpu, setCpu] = useState(() => Number(localStorage.getItem('monitor-cpu')) || 0);
  const [memory, setMemory] = useState(() => Number(localStorage.getItem('monitor-memory')) || 0);
  const [network, setNetwork] = useState(() => Number(localStorage.getItem('monitor-network')) || 0);
  const [alerts, setAlerts] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const addAlert = (metric, value) => {
    setAlerts(prev => [...prev.slice(-4), `${metric} usage too high: ${value}%`]);
  };

  // CPU metric every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const usage = Math.floor(Math.random() * 100);
      setCpu(usage);
      if (usage > THRESHOLD) addAlert('CPU', usage);
    }, 2000);
    return () => {
      clearInterval(interval);
      console.log('CPU monitor stopped.');
    };
  }, []);

  // Memory metric every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const usage = Math.floor(Math.random() * 100);
      setMemory(usage);
      if (usage > THRESHOLD) addAlert('Memory', usage);
    }, 2500);
    return () => {
      clearInterval(interval);
      console.log('Memory monitor stopped.');
    };
  }, []);

  // Network metric every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const usage = Math.floor(Math.random() * 100);
      setNetwork(usage);
      if (usage > THRESHOLD) addAlert('Network', usage);
    }, 3000);
    return () => {
      clearInterval(interval);
      console.log('Network monitor stopped.');
    };
  }, []);

  // Listener for the browser's online / offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Persist every metric whenever it changes
  useEffect(() => {
    localStorage.setItem('monitor-cpu', cpu);
    localStorage.setItem('monitor-memory', memory);
    localStorage.setItem('monitor-network', network);
  }, [cpu, memory, network]);

  const barColor = (value) => (value > THRESHOLD ? 'red' : 'green');

  return (
    <div>
      <h2>System Monitor</h2>
      <p>{isOnline ? '🟢 Online' : '🔴 Offline'}</p>
      {[['CPU', cpu], ['Memory', memory], ['Network', network]].map(([label, value]) => (
        <div key={label}>
          <p>{label} Usage: {value}%</p>
          <div style={{ background: '#ddd', width: 200, height: 10 }}>
            <div style={{ background: barColor(value), width: `${value}%`, height: 10 }} />
          </div>
        </div>
      ))}
      <h3>Alerts</h3>
      {alerts.length === 0 ? <p>No alerts.</p> : (
        <ul>
          {alerts.map((alert, index) => <li key={index} style={{ color: 'red' }}>⚠️ {alert}</li>)}
        </ul>
      )}
    </div>
  );
}

function SystemMonitorExercise() {
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <div>
      <h2>Exercise 2: System Monitor Dashboard</h2>
      <button onClick={() => setShowDashboard(prev => !prev)}>
        {showDashboard ? 'Stop Dashboard (Unmount)' : 'Start Dashboard (Mount)'}
      </button>
      <hr />
      {showDashboard && <SystemDashboard />}
    </div>
  );
}

export default SystemMonitorExercise;
