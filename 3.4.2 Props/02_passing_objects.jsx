// (UserCard is defined here so the object prop from the slide can be displayed)
function UserCard({ user }) {
  return <p>{user.id}: {user.name} ({user.email})</p>
}

function PassingObjects() {
  return (
    // Objects
    <UserCard
      user={{
        id: 1,
        name: 'John',
        email: 'john@example.com'
      }}
    />
  )
}

export default PassingObjects
