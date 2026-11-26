// Receiving props
function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <span>{props.role}</span>
    </div>
  );
}

export default UserCard
