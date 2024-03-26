
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterOption, setFilterOption] = useState('all');

  const addTask = (taskName) => {
    if (taskName.trim() !== '') {
      const newTask = { id: Date.now(), name: taskName, completed: false };
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const setFilter = (option) => {
    setFilterOption(option);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const taskName = e.target.elements.taskName.value;
          addTask(taskName);
          e.target.reset();
        }}>
          <input type="text" name="taskName" placeholder="Enter a new task" />
          <button type="submit">Add Task</button>
        </form>
        <div>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
      </div>
      <ul>
        {tasks.length === 0 ? (
          <p>No tasks to do</p>
        ) : (
          tasks
            .filter(task => filterOption === 'all' || (filterOption === 'active' && !task.completed) || (filterOption === 'completed' && task.completed))
            .map(task => (
              <li key={task.id}>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.name}
                </span>
                <button onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default App;
