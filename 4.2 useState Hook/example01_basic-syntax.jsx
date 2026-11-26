import { useState } from 'react';

// Basic syntax
const [state, setState] = useState(initialValue);

// Example
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [user, setUser] = useState({ name: '', email: '' });

// NOTE: this slide only shows syntax (it is not a runnable component).
