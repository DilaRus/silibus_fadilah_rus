import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";


function Dashboard() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const login = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 10000));

            if (Math.random() > 0) { // 70% success rate
                setUser({
                    id: 1,
                    name: 'John Doe',
                    role: 'admin',
                    avatar: 'https://via.placeholder.com/50'
                });
                setNotifications([
                    { id: 1, message: 'Welcome back!', type: 'success' },
                    { id: 2, message: 'You have 3 pending tasks', type: 'info' }
                ]);
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setNotifications([]);
        setError(null);
    };

    const dismissNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Dashboard</h1>
                {user ? (
                    <div className="user-info">
                        <img src={user.avatar} alt="Avatar" />
                        <span> Welcome, {user.name}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button onClick={login} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                )}
            </header>

            <main>
                {error && (
                    <div className="error-banner">
                        <p> x {error}</p>
                        <button onClick={() => setError(null)}>x</button>
                    </div>
                )}

                {isLoading && (
                    <div className="loading-spinner">
                        <DotLottieReact
                        src="https://lottie.host/0e37fe0d-4074-452f-8f99-513a3176d5e2/rE2bQp7VdC.lottie"
                        loop
                        autoplay
                        style={{ width: "150px", height: "100vh", display: "flex", align_items: "center" }}
                        />
                        <p> Loading...</p>
                    </div>
                )}

                {user ? (
                    <div className="dashboard-content">
                        <h2>Welcome to your dashboard, {user.name}!</h2>

                        {user.role === 'admin' && (
                            <div className="admin-panel">
                                <h3>Admin control</h3>
                                <button> manage users</button>
                                <button> view analytic</button>
                                <button> system settings</button>
                            </div>
                        )}

                        {notifications.length > 0 && (
                            <div className="notifications">
                                <h3>Notifications ({notifications.length})</h3>
                                {notifications.map(notification => (
                                    <div
                                        key={notifications.id}
                                        className={'notification ${notification.type}'}
                                    >
                                        <span>{notification.message}</span>
                                        <button onClick={() => dismissNotification(notification.id)}>x</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {notifications.length === 0 && (
                            <p>No new notifications</p>
                        )}
                    </div>
                ) : (
                    !isLoading && !error && (
                        <div className="welcome-message">
                            <h2>Please log in to access your dashboard</h2>
                            <p> Click the login button to get strated</p>
                        </div>
                    )
                )}
            </main></div >
    );
}

export default Dashboard
