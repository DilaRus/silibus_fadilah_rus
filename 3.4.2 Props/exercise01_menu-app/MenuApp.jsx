/*
Step 4: Create the Main MenuApp Component
Requirements:
  Create restaurant info object
  Create menu data object with 3 categories:
    Appetizers: At least 2 items
    Main Courses: At least 3 items
    Desserts: At least 1 item
  Each menu item has: id, name, description, price, category,
    isVegetarian (at least 2 vegetarian items), isSpicy (at least 1 spicy item), image
  Create handleItemOrder function: accepts itemName and price, displays an alert with the order details, logs the order to console
  Render the complete app: RestaurantHeader with restaurant info + three MenuCategory components
*/
import "./menu.css";
import RestaurantHeader from "./RestaurantHeader.jsx";
import MenuCategory from "./MenuCategory.jsx";

const restaurantInfo = {
  restaurantName: "Bella Vista",
  tagline: "Authentic Italian Cuisine",
  rating: 4.5,
  cuisine: "Italian"
};

const menuData = {
  appetizers: [
    { id: 1, name: "Bruschetta", description: "Grilled bread with tomatoes and basil", price: 8.99, category: "appetizer", isVegetarian: true, isSpicy: false, image: "https://picsum.photos/seed/bruschetta/300/200" },
    { id: 2, name: "Arancini", description: "Crispy rice balls with mozzarella", price: 9.5, category: "appetizer", isVegetarian: true, isSpicy: false, image: "https://picsum.photos/seed/arancini/300/200" }
  ],
  mains: [
    { id: 3, name: "Spaghetti Carbonara", description: "Egg, pecorino and pancetta", price: 15.99, category: "main", isVegetarian: false, isSpicy: false, image: "https://picsum.photos/seed/carbonara/300/200" },
    { id: 4, name: "Penne Arrabbiata", description: "Tomato sauce with chilli", price: 13.5, category: "main", isVegetarian: true, isSpicy: true, image: "https://picsum.photos/seed/arrabbiata/300/200" },
    { id: 5, name: "Margherita Pizza", description: "Tomato, mozzarella and basil", price: 12, category: "main", isVegetarian: true, isSpicy: false, image: "https://picsum.photos/seed/margherita/300/200" }
  ],
  desserts: [
    { id: 6, name: "Tiramisu", description: "Coffee flavoured layered dessert", price: 7.5, category: "dessert", isVegetarian: true, isSpicy: false, image: "https://picsum.photos/seed/tiramisu/300/200" }
  ]
};

function handleItemOrder(itemName, price) {
  alert("You ordered: " + itemName + " - $" + price.toFixed(2));
  console.log("Order placed for: ", itemName);
}

function MenuApp() {
  return (
    <div>
      <RestaurantHeader
        restaurantName={restaurantInfo.restaurantName}
        tagline={restaurantInfo.tagline}
        rating={restaurantInfo.rating}
        cuisine={restaurantInfo.cuisine}
      />
      <MenuCategory
        categoryName="Appetizers"
        items={menuData.appetizers}
        onItemOrder={handleItemOrder}
      />
      <MenuCategory
        categoryName="Main Courses"
        items={menuData.mains}
        onItemOrder={handleItemOrder}
      />
      <MenuCategory
        categoryName="Desserts"
        items={menuData.desserts}
        onItemOrder={handleItemOrder}
      />
    </div>
  );
}

export default MenuApp;
