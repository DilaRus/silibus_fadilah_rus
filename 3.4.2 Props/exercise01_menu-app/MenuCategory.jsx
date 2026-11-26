/*
Step 3: Create the MenuCategory Component
Props to accept:
  categoryName (string, default: "Category")
  items (array, default: [])
  onItemOrder (function)
Requirements:
  Display category name as an <h2>
  Check if items array is valid and not empty
  If no items, show "No items available in this category"
  Map through items and render MenuItem components
  Pass the onItemOrder function down to each MenuItem
  Use the spread operator ({...item}) to pass all item props
*/
import MenuItem from "./MenuItem.jsx";

function MenuCategory({ categoryName = "Category", items = [], onItemOrder }) {
  return (
    <div>
      <h2>{categoryName}</h2>
      {!Array.isArray(items) || items.length === 0 ? (
        <p>No items available in this category</p>
      ) : (
        items.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            onOrder={onItemOrder}
          />
        ))
      )}
    </div>
  );
}

export default MenuCategory;
