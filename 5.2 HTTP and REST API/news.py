import { useState, useEffect } from 'react';

const CACHE_MINUTES = 5;

// Each source knows how to fetch its data and turn its own response format into { id, title, source }
const sources = {
  hackernews: {
    label: 'Hacker News',
    load: async () => {
      const idsResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (!idsResponse.ok) throw new Error(`HTTP ${idsResponse.status}`);
      const ids = (await idsResponse.json()).slice(0, 10);
      const stories = await Promise.all(
        ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json()))
      );
      return stories.map(story => ({ id: `hn-${story.id}`, title: story.title, source: 'Hacker News' }));
    },
  },
  placeholder: {
    label: 'JSONPlaceholder',
    load: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const posts = await response.json();
      return posts.map(post => ({ id: `jp-${post.id}`, title: post.title, source: 'JSONPlaceholder' }));
    },
  },
};

// Read an article list from localStorage if it is still fresh
const readCache = (key) => {
  const cached = localStorage.getItem(`news-${key}`);
  if (!cached) return null;
  const { time, articles } = JSON.parse(cached);
  return Date.now() - time < CACHE_MINUTES * 60 * 1000 ? articles : null;
};

function NewsAggregator() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [refreshCount, setRefreshCount] = useState(0);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    let ignore = false; // avoids setting state after unmount / a newer request

    const loadAll = async () => {
      setLoading(true);
      setErrors([]);
      let usedCache = true;
      const collected = [];
      const failed = [];

      for (const [key, source] of Object.entries(sources)) {
        // refreshCount > 0 means the user pressed Refresh: skip the cache
        let data = refreshCount === 0 ? readCache(key) : null;
        if (!data) {
          usedCache = false;
          try {
            data = await source.load();
            localStorage.setItem(`news-${key}`, JSON.stringify({ time: Date.now(), articles: data }));
          } catch (err) {
            // 429 means rate limited, any other failure is reported per source
            failed.push(err.message.includes('429')
              ? `${source.label}: rate limit reached, try again later`
              : `${source.label}: ${err.message}`);
            data = [];
          }
        }
        collected.push(...data);
      }

      if (!ignore) {
        setArticles(collected);
        setErrors(failed);
        setFromCache(usedCache);
        setLoading(false);
      }
    };

    loadAll();
    return () => { ignore = true; };
  }, [refreshCount]);

  const visibleArticles = articles.filter(article =>
    (sourceFilter === 'all' || article.source === sources[sourceFilter].label) &&
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>News Aggregator</h2>
      <input placeholder="Search headlines..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
        <option value="all">All sources</option>
        {Object.entries(sources).map(([key, source]) => (
          <option key={key} value={key}>{source.label}</option>
        ))}
      </select>
      <button onClick={() => setRefreshCount(count => count + 1)} disabled={loading}>Refresh</button>

      {loading && <p>Loading news...</p>}
      {!loading && fromCache && <p><small>Showing cached results (valid for {CACHE_MINUTES} minutes)</small></p>}
      {errors.map(message => <p key={message} style={{ color: 'red' }}>{message}</p>)}

      <ul>
        {visibleArticles.map(article => (
          <li key={article.id}>{article.title} <small>({article.source})</small></li>
        ))}
      </ul>
      {!loading && visibleArticles.length === 0 && <p>No articles found.</p>}
    </div>
  );
}

export default NewsAggregator;
