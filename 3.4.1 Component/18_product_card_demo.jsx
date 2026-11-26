// Uses the reusable ProductCard component for Practice Exercise 1 with a few sample products
import ProductCard from './exercise01_product-card.jsx'

const products = [
  { id: 1, name: "Wireless Mouse", price: 19.99, description: "Comfortable and quiet wireless mouse.", image: "https://picsum.photos/seed/mouse/300/200" },
  { id: 2, name: "Mechanical Keyboard", price: 59.5, description: "Tactile switches with backlight.", image: "https://picsum.photos/seed/keyboard/300/200" },
  { id: 3, name: "USB-C Hub", price: 34, description: "Seven ports in a compact hub.", image: "https://picsum.photos/seed/hub/300/200" }
]

function ProductCardDemo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductCardDemo
