/*
Step 2: Create the MenuItem Component
Props to accept:
  name (string, default: "Menu Item")
  description (string, default: "")
  price (number, default: 0)
  category (string, default: "general")
  isVegetarian (boolean, default: false)
  isSpicy (boolean, default: false)
  image (string, default: "/default-food.jpg")
  onOrder (function)
Requirements:
  Display item image, name, and price
  Show description if provided
  Add tags for vegetarian (🌱) and spicy (🌶️) items
  Include an "Order Now" button that calls the onOrder function
  Use conditional rendering for tags and description
  Format price to 2 decimal places using toFixed(2)
*/
function MenuItem({
  name = "Menu Item",
  description = "",
  price = 0,
  category = "general",
  isVegetarian = false,
  isSpicy = false,
  image = "/default-food.jpg",
  onOrder
}) {
  return (
    <div className="menu-item">
      <img src={image} alt={name} width="150" />
      <h3>{name} - ${price.toFixed(2)}</h3>
      {description && <p>{description}</p>}
      <p>
        {isVegetarian ? "🌱" : null}
        {isSpicy ? "🌶️" : null}
      </p>
      <button onClick={() => onOrder(name, price)}>
        Order Now
      </button>
    </div>
  );
}

export default MenuItem;
