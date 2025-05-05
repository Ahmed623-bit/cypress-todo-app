import React, { useState, useEffect } from 'react';
import '../css/TodoApp.css';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // تأكد من تحميل المهام من localStorage عند بداية تحميل التطبيق
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // حفظ المهام في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask = { id: Date.now(), title: input, done: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="todo-input-area">
        <input
          placeholder="Add task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add+</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              className={task.done ? 'done' : ''}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
