// Without Destructuring
function UserCardWithoutDestructuring(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

// With Destructuring (Preferred)
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// (both components are named UserCard on the slides; the first is renamed so they can be in one file)
function PropsDestructuring() {
  return (
    <div>
      <UserCardWithoutDestructuring name="John Doe" age={25} email="john@example.com" />
      <UserCard name="Jane Smith" age={30} email="jane@example.com" />
    </div>
  )
}

export default PropsDestructuring
