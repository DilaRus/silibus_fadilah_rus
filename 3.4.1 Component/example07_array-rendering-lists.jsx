function ArrayRendering() {
  const fruits = ["Apple", "Banana", "Orange"];
  const users = [
    { id: 1, name: "John", email: "john@email.com" },
    { id: 2, name: "Jane", email: "jane@email.com" }
  ];

  return (
    <div>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <div>
        {users.map(user => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArrayRendering
