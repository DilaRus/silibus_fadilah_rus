/*
Exercise 2: Real-time Search Filter
Task: Create a searchable product list
Requirements:
  - Search input with real-time filtering
  - Category filter dropdown
  - Click to add items to favorites
  - Clear search on Escape key
  - Enter key to select first result
*/
import { useState } from 'react';

const products = [
  { id: 1, name: 'Laptop', category: 'electronics' },
  { id: 2, name: 'Headphones', category: 'electronics' },
  { id: 3, name: 'Smartphone', category: 'electronics' },
  { id: 4, name: 'T-Shirt', category: 'clothing' },
  { id: 5, name: 'Jeans', category: 'clothing' },
  { id: 6, name: 'Notebook', category: 'stationery' },
  { id: 7, name: 'Pen', category: 'stationery' },
];

function SearchFilter() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);

  const visibleProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'all' || product.category === category)
  );

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearch('');
    } else if (e.key === 'Enter' && visibleProducts.length > 0) {
      setSelected(visibleProducts[0]);
    }
  };

  return (
    <div>
      <h2>Product Search</h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products (Esc clears, Enter selects first)"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="stationery">Stationery</option>
      </select>

      <p>Selected: {selected ? selected.name : 'none'}</p>

      <ul>
        {visibleProducts.map(product => (
          <li
            key={product.id}
            onClick={() => toggleFavorite(product.id)}
            style={{ cursor: 'pointer' }}
          >
            {favorites.includes(product.id) ? '★ ' : '☆ '}
            {product.name} ({product.category})
          </li>
        ))}
      </ul>
      {visibleProducts.length === 0 && <p>No products found.</p>}

      <h3>Favorites</h3>
      <p>
        {favorites.length === 0
          ? 'Click a product to add it to your favorites.'
          : products.filter(p => favorites.includes(p.id)).map(p => p.name).join(', ')}
      </p>
    </div>
  );
}

export default SearchFilter;
