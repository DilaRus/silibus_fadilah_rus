import UserCard from './example11_user-card-destructured.jsx'

function App() {
  return (
    <div>
      <UserCard
        name="John Doe"
        email="john@example.com"
        role="Developer"
      />
      <UserCard
        name="Jane Smith"
        email="jane@example.com"
        role="Designer"
      />
    </div>
  );
}

export default App
