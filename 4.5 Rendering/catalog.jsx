import { useState, useMemo } from 'react';

function ProductCatalog() {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'electronics', inStock: true, rating: 4.5 },
    { id: 2, name: 'Phone', price: 699, category: 'electronics', inStock: false, rating: 4.2 },
    { id: 3, name: 'Shirt', price: 29, category: 'clothing', inStock: true, rating: 4.0 },
    { id: 4, name: 'Shoes', price: 89, category: 'clothing', inStock: true, rating: 4.7 },
    { id: 5, name: 'Book', price: 15, category: 'books', inStock: true, rating: 4.3 },
    { id: 6, name: 'Headphones', price: 199, category: 'electronics', inStock: false, rating: 4.1 }
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    inStock: false,
    minPrice: 0,
    maxPrice: 1000,
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesStock = !filters.inStock || product.inStock;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesCategory && matchesStock && matchesPrice && matchesSearch;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'price' || sortBy === 'rating') {
        comparison = a[sortBy] - b[sortBy];
      } else {
        comparison = a[sortBy].localeCompare(b[sortBy]);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, filters, sortBy, sortOrder]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      inStock: false,
      minPrice: 0,
      maxPrice: 1000,
      searchTerm: ''
    });
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="product-catalog">
      <div className="filters">
        <h3>Filters</h3>

        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
        />

        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilter('inStock', e.target.checked)}
          />
          In Stock Only
        </label>

        <div className="price-range">
          <label>
            Min Price: $
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
            />
          </label>
          <label>
            Max Price: $
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            />
          </label>
        </div>

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="sort-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="results-info">
        <p>Showing {filteredAndSortedProducts.length} of {products.length} products</p>
      </div>

      <div className="product-grid">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map(product => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p className="price">${product.price}</p>
              <p className="category">{product.category}</p>
              <p className="rating">⭐ {product.rating}</p>
              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">✅ In Stock</span>
                ) : (
                  <span className="out-of-stock">❌ Out of Stock</span>
                )}
              </div>
              <button disabled={!product.inStock}>
                {product.inStock ? 'Add to Cart' : 'Notify When Available'}
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCatalog;
