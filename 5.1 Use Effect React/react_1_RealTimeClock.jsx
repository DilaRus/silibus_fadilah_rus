// useState for managing component data (state)
// useEffect for running side effect (like timers or document updates)
import { useState, useEffect } from 'react';

function RealTimeClock() {
    const [time, setTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(true);
    const [format24Hour, setFormat24Hour] = useState(false);

    useEffect(() => {

        // declare a variable for storing the timer ID
        let interval;

        if (isRunning) {
            // setInterval runs the function repeatedly every 1000 milliseconds (1 second)
            interval = setInterval(() => {
                // update the 'time' state with the current date/time
                setTime(new Date());
            }, 1000);
        }

        // Cleanup function
        // The component is removed from the screen, or
        // Before the effect re-runs (when isRunning changes)
        return () => {
            // Stop the timer if it exists to prevent multiple timers running together
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]); // Re-run effect when isRunning changes

    // Update document title with current time
    useEffect(() => {
        document.title = `Clock - ${formatTime(time)}`;

        // Cleanup: Reset title when component unmounts
        return () => {
            document.title = 'React App';
        };
    }, [time, format24Hour]);

    const formatTime = (date) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !format24Hour
        };
        return date.toLocaleTimeString('en-US', options);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="clock-container">
            <div className="date">{formatDate(time)}</div>
            <div className="time">{formatTime(time)}</div>

            <div className="controls">
                {/* Button to toggle pause/resume the clock */}
                <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Resume'}
                </button>

                {/* Checkbox to toggle 24-hour format on/off */}
                <label>
                    <input
                        type="checkbox"
                        checked={format24Hour}
                        onChange={(e) => setFormat24Hour(e.target.checked)}
                    />
                    24-hour format
                </label>
            </div>

            <div className="status">
                Clock is {isRunning ? 'running' : 'paused'}
            </div>
        </div>
    );
}

export default RealTimeClock;
