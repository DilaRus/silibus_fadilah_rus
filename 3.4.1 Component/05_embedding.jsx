function EmbeddingExpressions() {
  const name = "John Doe";
  const age = 25;

  const userInfo = (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>You are {age} years old</p>
      <p>Next year you'll be {age + 1}</p>
    </div>
  );

  return userInfo
}

export default EmbeddingExpressions
