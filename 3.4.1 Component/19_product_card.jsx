// Practice Exercise 1: Product Card Component (slides 25-26)
// Create a reusable ProductCard component with:
//   Product image
//   Product name
//   Price
//   Description
//   Add to cart button
// Starter from slide 26:
//   function ProductCard({ product }) {
//     return (
//       <div className="product-card">
//         {/* Your implementation here */}
//       </div>
//     );
//   }
import './exercise01_product-card.css'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p>{product.description}</p>
      <button>Add to cart</button>
    </div>
  );
}

export default ProductCard
