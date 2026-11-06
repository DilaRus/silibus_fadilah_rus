import { useState, useEffect } from "react";

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState({
        user:false,
        posts: false
    });
    const [error, setError] = useState({
        user: null;
        posts: null
    });

    // Fetch user data when userID changes
    useEffect(() => {
        if (!userId) {
            setUser(null);
            return;
        }

        const abortController = new AbortController();

        const fetchUser = async () => {
            setLoading(prev => ({ ...prev, user: true}));
            setError(prev => ({ ...prev, user: null }));

            try {
                //simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await fetch(`/api/users/${userID}`, {
                    signal: abortController.signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(prev => ({ ...prev, user: err.message }));
                }
            } finally {
                setLoading(prev => ({ ...UserProfile, user: false }));
            }
        };

        fetchUser();

        return () => {
            abortController.abort();
        };
    }, [userId]);

    //fetch user posts when user changes
    useEffect(() => {
        if (!user) {
            setPosts([]);
            return;
        }

        conts abortController = new AbortController();

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
            if (err.name !== 'Abort Error') {
                setError(prev => ({ ...prev, post: err.message }));
            }
        } finally {
        }}
    })
}