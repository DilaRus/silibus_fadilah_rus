// Import React Hooks
// useState → to store and update data (state)
// useEffect → to perform side effects (like event listeners or saving data)
import { useState, useEffect } from "react";

// Define the WindowTracker component
function WindowTracker() {
    // --- STATE 1: WINDOW SIZE ---
    // Store the current width and height of the browser window
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,   // current window width in pixels
        height: window.innerHeight  // current window height in pixels
    });

    // --- STATE 2: SCROLL POSITION ---
    // Store the current scroll position of the page (horizontal and vertical)
    const [scrollPosition, setScrollPosition] = useState({
        x: window.scrollX, // distance scrolled horizontally
        y: window.scrollY  // distance scrolled vertically
    });

    // --- STATE 3: CONNECTION STATUS ---
    // Store whether the user is online or offline
    const [isOnline, setIsOnline] = useState(navigator.onLine);


    // --- EFFECT 1: TRACK WINDOW RESIZE ---
    useEffect(() => {
        // Define a function to run every time the window is resized
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Add an event listener that runs handleResize() whenever the window is resized
        window.addEventListener('resize', handleResize);

        // Cleanup function: remove the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency → runs only once when component mounts


    // --- EFFECT 2: TRACK SCROLL POSITION ---
    useEffect(() => {
        // Define a function that runs whenever the page is scrolled
        const handleScroll = () => {
            setScrollPosition({
                x: window.scrollX, // horizontal scroll position
                y: window.scrollY  // vertical scroll position
            });
        };

        // Add event listener for scrolling
        window.addEventListener('scroll', handleScroll);

        // Cleanup function: remove scroll listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Runs once on mount


    // --- EFFECT 3: ONLINE / OFFLINE STATUS TRACKER ---
    useEffect(() => {
        // Define what happens when user goes online
        const handleOnline = () => setIsOnline(true);

        // Define what happens when user goes offline
        const handleOffline = () => setIsOnline(false);

        // Add both event listeners
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup function: remove both listeners on unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []); // Runs once when component mounts


    // --- EFFECT 4: SAVE DATA TO LOCAL STORAGE ---
    useEffect(() => {
        // Create a data object containing size, scroll, and timestamp
        const data = {
            windowSize,
            scrollPosition,
            timestamp: new Date().toISOString() // convert current time to readable string
        };

        // Save data as a string in the browser's local storage
        // This allows it to persist even after refreshing
        localStorage.setItem('windowTracker', JSON.stringify(data));
    }, [windowSize, scrollPosition]);
    // Runs every time the window is resized OR scrolled


    // --- EFFECT 5: PAGE VISIBILITY TRACKER ---
    useEffect(() => {
        // Define what happens when the page becomes hidden or visible
        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.log('Page is hidden'); // Tab not visible
            } else {
                console.log('Page is visible'); // Tab visible again
            }
        };

        // Add event listener for page visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup function: remove listener when component unmounts
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []); // Runs only once on mount


    // --- COMPONENT OUTPUT (WHAT WE SEE ON SCREEN) ---
    return (
        <div className="window-tracker">
            <h3>Window & Scroll Tracker</h3>

            {/* Display all tracked information in a grid layout */}
            <div className="info-grid">
               
                {/* WINDOW SIZE CARD */}
                <div className="info-card">
                    <h4>Window Size</h4>
                    <p>Width: {windowSize.width}px</p>
                    <p>Height: {windowSize.height}px</p>
                    <p>
                        Aspect Ratio: {(windowSize.width / windowSize.height).toFixed(2)}
                    </p>
                </div>

                {/* SCROLL POSITION CARD */}
                <div className="info-card">
                    <h4>Scroll Position</h4>
                    <p>X: {scrollPosition.x}px</p>
                    <p>Y: {scrollPosition.y}px</p>
                    <p>
                        Total Scrolled: {Math.round(Math.sqrt(
                            scrollPosition.x ** 2 + scrollPosition.y ** 2
                        ))}px
                    </p>
                    {/* The line above calculates the diagonal scroll distance using Pythagoras */}
                </div>

                {/* ONLINE / OFFLINE CARD */}
                <div className="info-card">
                    <h4>Connection Status</h4>
                    <p className={isOnline ? 'online' : 'offline'}>
                        {isOnline ? '🟢 Online' : '🔴 Offline'}
                    </p>
                </div>

                {/* DEVICE CLASSIFICATION CARD */}
                <div className="info-card">
                    <h4>Viewport Classification</h4>
                    <p>
                        {/* Display device type based on width */}
                        {windowSize.width < 768 ? 'Mobile' :
                        windowSize.width < 1024 ? 'Tablet' : 'Desktop'}
                    </p>
                </div>
            </div>

            {/* --- EXTRA SCROLL AREA --- */}
            {/* Creates a tall area so students can test scroll tracking */}
            <div style={{
                height: '200vh', // 200% viewport height to enable scrolling
                background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)'
            }}>
                <p>Scroll down to see the scroll position change...</p>
            </div>
        </div>
    );
}

// Export the component for use in other files
export default WindowTracker;

