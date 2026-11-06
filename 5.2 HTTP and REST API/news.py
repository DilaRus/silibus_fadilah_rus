import { useState, useEffect } from "react";

function NewsAggregator() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchNews() {
            const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY");
            const data = await res.json();
            setArticles(data.articles);
        }
        fetchNews();
    }, []);

    return (
        <div>
            <h2>Latest News</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default NewsAggregator;
