import { useState, useEffect } from "react";
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
  
    const [posts, setPosts] = useState([]);
    
    const [loading, setLoading] = useState({
        user: false,   // true while user is being fetched
        posts: false   // true while posts are being fetched
    });
  
    const [error, setError] = useState({
        user: null,    // error message string if user fetch fails
        posts: null    // error message string if posts fetch fails
    });
    // ------------------------------------------------------------------
    // Effect: Fetch user data when `userId` changes
    // ------------------------------------------------------------------
    useEffect(() => {
        // If there's no userId, clear the user state and exit early.
        if (!userId) {
            setUser(null);
            return; // nothing to fetch
        }
        
        const abortController = new AbortController();
     
        const fetchUser = async () => {
           
            setLoading(prev => ({ ...prev, user: true }));
         
            setError(prev => ({ ...prev, user: null }));
            try {
              
                await new Promise(resolve => setTimeout(resolve, 1000));
              
                const response = await fetch(`/api/users/${userId}`, {
                    signal: abortController.signal
                });
              
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
               
                const userData = await response.json();
                // Save the user into state so React will re-render and show the data.
                setUser(userData);
            } catch (err) {
               
                if (err.name !== 'AbortError') {
                    // Save the error message into state for displaying to the user.
                    setError(prev => ({ ...prev, user: err.message }));
                }
            } finally {
              
                setLoading(prev => ({ ...prev, user: false }));
            }
        };
      
        fetchUser();
        
        return () => {
            abortController.abort();
        };
    }, [userId]); // re-run this effect when userId changes
    // ------------------------------------------------------------------
    // Effect: Fetch posts when `user` changes (i.e., after user is loaded)
    // ------------------------------------------------------------------
    useEffect(() => {
       
        if (!user) {
            setPosts([]);
            return;
        }
      
        const abortController = new AbortController();
        const fetchPosts = async () => {
          
            setLoading(prev => ({ ...prev, posts: true }));
            setError(prev => ({ ...prev, posts: null }));
            try {
               
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const response = await fetch(`/api/users/${user.id}/posts`, {
                    signal: abortController.signal
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: ${response.status}`);
                }
                
                const postsData = await response.json();
                setPosts(postsData);
            } catch (err) {
              
                if (err.name !== 'AbortError') {
                    setError(prev => ({ ...prev, posts: err.message }));
                }
            } finally {
               
                setLoading(prev => ({ ...prev, posts: false }));
            }
        };
        
        fetchPosts();
        
        return () => {
            abortController.abort();
        };
    }, [user]); // re-run this effect when `user` object changes
    // ------------------------------------------------------------------
    // Effect: Update page title when the user changes
    // ------------------------------------------------------------------
    useEffect(() => {
       
        if (user) {
            document.title = `Profile: ${user.name}`;
        } else {
            // Otherwise use a generic title.
            document.title = 'User Profile';
        }
       
        return () => {
            document.title = 'React App';
        };
    }, [user]); // re-run when `user` changes
    // ------------------------------------------------------------------
    // Effect: Mock/fake the fetch API for demo purposes so this component works
    // without a real backend. This is only for teaching/demo; in real apps
    // you would not overwrite window.fetch.
    // ------------------------------------------------------------------
    useEffect(() => {
        // Example mock data for users and posts.
        const mockUsers = {
            1: { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'avatar1.jpg' },
            2: { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'avatar2.jpg' }
        };
        const mockPosts = {
            1: [
                { id: 1, title: 'My First Post', content: 'Hello worlds!', date: '2024-01-15' },
                { id: 2, title: 'React Tips', content: 'useEffect is powerful', date: '2024-01-16' }
            ],
            2: [
                { id: 3, title: 'Javascript Tricks', content: 'Async/await is great!', date: '2024-01-17' }
            ]
        };
       
        const originalFetch = window.fetch;
      
        window.fetch = async (url, options) => {
          
            if (options?.signal?.aborted) {
               
                const err = new Error('AbortError');
                err.name = 'AbortError';
                throw err;
            }
           
            if (url.includes('/api/users/') && !url.includes('/posts')) {
                const userId = parseInt(url.split('/').pop());
                const user = mockUsers[userId];
                if (user) {
                    return {
                        ok: true,
                        json: async () => user
                    };
                } else {
                   
                    return { ok: false, status: 404 };
                }
            }
          
            if (url.includes('/posts')) {
               
                const userId = parseInt(url.split('/')[3]);
                const posts = mockPosts[userId] || [];
                return {
                    ok: true,
                    json: async () => posts
                };
            }
            
            return originalFetch(url, options);
        };
       
        return () => {
            window.fetch = originalFetch;
        };
    }, []); // empty dependency -> run once on mount
    // ------------------------------------------------------------------
    // Render logic: show different UIs depending on userId, loading, errors, and data.
    // ------------------------------------------------------------------
    // If parent didn't pass a userId, prompt the user to select one.
    if (!userId) {
        return (
            <div className="user-profile">
                <p>Please select a user to view their profile.</p>
            </div>
        );
    }
   
    return (
        <div className="user-profile">
            <div className="user-section">
                <h2>User Profile</h2>
                {/* Show loading state for the user fetch */}
                {loading.user && <div className="loading">Loading user...</div>}
                {/* Show an error message and a simple retry button if fetching user failed */}
                {error.user && (
                    <div className="error">
                        Error loading user: {error.user}
                        {/* Using window.location.reload for demo; in real apps provide a proper retry function. */}
                        <button onClick={() => window.location.reload()}>Retry</button>
                    </div>
                )}
                {/* When user is available and not loading, display the user's info */}
                {user && !loading.user && (
                    <div className="user-info">
                        <img src={user.avatar} alt={user.name} />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                )}
            </div>
            <div className="posts-section">
                <h3>User Posts</h3>
                {/* Loading indicator for posts */}
                {loading.posts && <div className="loading">Loading posts...</div>}
                {/* Error message for posts */}
                {error.posts && (
                    <div className="error">
                        Error loading posts: {error.posts}
                    </div>
                )}
                {/* Render list of posts when available */}
                {posts.length > 0 && !loading.posts && (
                    <div className="posts-list">
                        {posts.map(post => (
                            <div key={post.id} className="post-card">
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <small>{post.date}</small>
                            </div>
                        ))}
                    </div>
                )}
                {/* If there are no posts (and no error/loading), show a friendly message */}
                {posts.length === 0 && !loading.posts && !error.posts && user && (
                    <p>No posts found for this user.</p>
                )}
            </div>
        </div>
    );
}
export default UserProfile;
