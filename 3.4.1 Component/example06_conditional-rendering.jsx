function ConditionalRendering() {
  const isLoggedIn = true;
  const user = { name: "Alice", role: "admin" };

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}

      {user.role === "admin" && (
        <button>Admin Panel</button>
      )}
    </div>
  );
}

export default ConditionalRendering
