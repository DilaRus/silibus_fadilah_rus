// Child Component
function UserCard(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Parent Component
function App() {
  return <UserCard name="John Doe" age={25} />;
}

export default App
