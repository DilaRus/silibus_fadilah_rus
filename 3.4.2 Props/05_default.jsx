//Method 1: Default Parameters
function UserCard({ name = "Anonymous", age = 0, isActive = false }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

function DefaultValues() {
  return (
    <div>
      <UserCard />
      <UserCard name="John Doe" age={25} isActive={true} />
    </div>
  )
}

export default DefaultValues
