/*
Exercise 3: Personal Expense Tracker
Task: Build a complete expense tracking application
  - Add new expenses (description, amount, category)
  - Display list of all expenses
  - Calculate and show total expenses
  - Filter expenses by category
  - Delete individual expenses
(Starter structure from the presenter's notes: expenses, description, amount, category, filter state.)
*/
import { useState } from 'react';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [filter, setFilter] = useState('all');

  const categories = ['food', 'transport', 'bills', 'entertainment', 'other'];

  // Add a new expense, ignoring empty descriptions and invalid amounts
  const addExpense = () => {
    if (!description.trim() || amount === '' || Number(amount) <= 0) return;
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { id: Date.now(), description: description.trim(), amount: Number(amount), category },
    ]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  // Show only the chosen category ('all' shows everything)
  const visibleExpenses = filter === 'all'
    ? expenses
    : expenses.filter(expense => expense.category === filter);

  const total = visibleExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <h2>Personal Expense Tracker</h2>

      {/* Form to add expenses */}
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button onClick={addExpense}>Add Expense</button>

      {/* Filter dropdown */}
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">all</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Expenses list */}
      <ul>
        {visibleExpenses.map(expense => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount.toFixed(2)} ({expense.category})
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Total calculation */}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default ExpenseTracker;
