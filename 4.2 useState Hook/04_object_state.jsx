// FIX: the slide omits this import, but useState is used below (same import as Example 1).
import { useState } from 'react';

function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={user.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <input
        placeholder="Email"
        value={user.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <input
        placeholder="Phone"
        value={user.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      <div>
        <h3>User Info:</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </div>
  );
}

export default UserForm;
