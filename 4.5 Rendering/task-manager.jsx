/*
Exercise 2: Task Management with Categories
Task: Create a task manager with dynamic filtering
Requirements:
  - Add tasks with different priorities and categories
  - Filter by completion status, priority, and category
  - Conditional rendering for overdue tasks
  - Bulk actions (select all, delete selected)
  - Empty states for different filter combinations
*/
import { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('normal');
  const [category, setCategory] = useState('general');
  const [dueDate, setDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  const addTask = () => {
    if (text.trim() === '') return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: text.trim(), completed: false, selected: false, priority, category, dueDate },
    ]);
    setText('');
    setPriority('normal');
    setCategory('general');
    setDueDate('');
  };

  const toggleCompleted = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const toggleSelected = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, selected: !task.selected } : task));
  };

  // Bulk actions work on the tasks that match the current filters
  const filteredTasks = tasks.filter(task => {
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'active' && !task.completed);
    const matchPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchStatus && matchPriority && matchCategory;
  });

  const selectAll = () => {
    const visibleIds = filteredTasks.map(task => task.id);
    setTasks(prev => prev.map(task => visibleIds.includes(task.id) ? { ...task, selected: true } : task));
  };

  const deleteSelected = () => {
    setTasks(prev => prev.filter(task => !task.selected));
  };

  const selectedCount = tasks.filter(task => task.selected).length;
  const filtersActive = filterStatus !== 'all' || filterPriority !== 'all' || filterCategory !== 'all';

  return (
    <div>
      <h2>Task Manager</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="home">Home</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      <div style={{ marginTop: '1em' }}>
        <strong>Filter: </strong>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
      </div>

      <div style={{ marginTop: '1em' }}>
        <button onClick={selectAll} disabled={filteredTasks.length === 0}>Select All</button>
        <button onClick={deleteSelected} disabled={selectedCount === 0}>
          Delete Selected ({selectedCount})
        </button>
      </div>

      {/* Different empty states depending on why the list is empty */}
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task above.</p>
      ) : filteredTasks.length === 0 ? (
        <p>{filtersActive ? 'No tasks match the current filters.' : 'No tasks to show.'}</p>
      ) : (
        <ul>
          {filteredTasks.map(task => {
            const isOverdue = !task.completed && task.dueDate !== '' && task.dueDate < today;
            return (
              <li key={task.id} style={{ color: isOverdue ? 'red' : 'inherit' }}>
                <input
                  type="checkbox"
                  checked={task.selected}
                  onChange={() => toggleSelected(task.id)}
                  title="Select for bulk actions"
                />
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                  title="Mark as completed"
                />
                <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </strong>{' '}
                | <em>{task.priority.toUpperCase()}</em> | <span>{task.category}</span>
                {task.dueDate && <span> | due {task.dueDate}</span>}
                {isOverdue && ' (Overdue!)'}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;
