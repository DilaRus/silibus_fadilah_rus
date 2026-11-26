import { useState } from 'react';

function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'fruit' },
    { id: 2, name: 'Carrot', category: 'vegetable' },
    { id: 3, name: 'Banana', category: 'fruit' }
  ]);
  const [newItem, setNewItem] = useState('');

  const handleListClick = (e) => {
    // Event delegation - handle clicks on list items
    const listItem = e.target.closest('li');
    if (!listItem) return;

    const itemId = parseInt(listItem.dataset.id);
    const action = e.target.dataset.action;

    if (action === 'delete') {
      setItems(prev => prev.filter(item => item.id !== itemId));
    } else if (action === 'edit') {
      const newName = prompt('Enter new name:');
      if (newName) {
        setItems(prev => prev.map(item =>
          item.id === itemId ? { ...item, name: newName } : item
        ));
      }
    }
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, {
        id: Date.now(),
        name: newItem,
        category: 'other'
      }]);
      setNewItem('');
    }
  };

  return (
    <div>
      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul onClick={handleListClick} style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            data-id={item.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              margin: '5px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{item.name} ({item.category})</span>
            <div>
              <button data-action="edit">Edit</button>
              <button data-action="delete" style={{ marginLeft: '5px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicList;
