/*
Practical Example: Product Card Component (slide 9)
Starter on the slide:
  function ProductCard({ id, name = "Unknown Product", price = 0, image = "/placeholder.jpg", isOnSale = false, }) {
    return ( // Write your JSX here );
  }
  function ProductList() {
    const products = [ //Create your array of products here ];
    return ( <div className="product-list"> {products.map(product => ( // Call your component here ))} </div> );
  }
Uses only props, destructuring, default values, conditional rendering and a function prop (this lesson and earlier).
*/
function ProductCard({
  id,
  name = "Unknown Product",
  price = 0,
  image = "/placeholder.jpg",
  isOnSale = false,
  onAddToCart
}) {
  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(id, name, price);
    } else {
      console.warn('onAddToCart is not a function');
    }
  };

  return (
    <div className="product-card" style={{ border: '1px solid #ccc', padding: 12, width: 200 }}>
      <img src={image} alt={name} width="180" />
      <h3>{name}</h3>
      <div className="price">
        <span style={{ color: isOnSale ? 'red' : 'inherit' }}>
          ${price.toFixed(2)}
        </span>
        {isOnSale && <span className="sale-badge"> SALE!</span>}
      </div>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: "Laptop", price: 999.99, image: "https://picsum.photos/seed/laptop/180/120", isOnSale: true },
    { id: 2, name: "Mouse", price: 29.99, image: "https://picsum.photos/seed/mouse2/180/120" },
    { id: 3, price: 5 }
  ];

  const handleAddToCart = (id, name, price) => {
    console.log(`Added ${name} (${id}) - $${price} to cart`);
  };

  return (
    <div className="product-list" style={{ display: 'flex', gap: 12 }}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList
