/*
Mini-Project: Restaurant Menu Display (slides 10-19)
Step 1: Create the RestaurantHeader Component
Props to accept:
  restaurantName (string, default: "Our Restaurant")
  tagline (string, default: "Delicious food for everyone")
  rating (number, default: 0)
  cuisine (string, default: "International")
Requirements:
  Display the restaurant name as an <h1>
  Show the tagline as a paragraph
  Display the cuisine type
  Show star rating (you can use ⭐ emoji)
  Create a function to render stars based on the rating number
*/
function RestaurantHeader({
  restaurantName = "Our Restaurant",
  tagline = "Delicious food for everyone",
  rating = 0,
  cuisine = "International"
}) {
  // Render stars based on the rating number
  const renderStars = (count) => "⭐".repeat(Math.floor(count));

  return (
    <div>
      <h1>{restaurantName}</h1>
      <p>{tagline}</p>
      <p>Cuisine: {cuisine}</p>
      <p>Rating: {renderStars(rating)}</p>
    </div>
  );
}

export default RestaurantHeader;
