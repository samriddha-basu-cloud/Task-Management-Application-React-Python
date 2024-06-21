import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import './LandingPage.css'; // You'll need to create this CSS file

const LandingPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API
    fetch('https://task-management-backend-89n5.onrender.com/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    // API call to add a task
    fetch('https://task-management-backend-89n5.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(newTask => setTasks([...tasks, newTask]))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    // API call to delete the task
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // After successful deletion, update the tasks list
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="container">
      <h1 className="title">Task Management</h1>
      <div className="form-container">
        <TaskForm onSubmit={addTask} />
      </div>
      <h2 className="heading">Tasks</h2>
      <div className="task-list-container">
        {tasks.length === 0 ? (
          <p className="no-tasks-message">
            No tasks as of now. Add tasks by filling the form above.
          </p>
        ) : (
          <TaskList tasks={tasks} onDelete={deleteTask} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;