import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';
import './TaskPage.css'; // You'll need to create this CSS file

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch task details from the API
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const updateTask = (updatedTask) => {
    // API call to update the task
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    .then(response => response.json())
    .then(data => setTask(data))
    .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = () => {
    // API call to delete the task
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(() => window.location.href = '/')
    .catch(error => console.error('Error deleting task:', error));
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container">
      <Link to="/" className="back-button">
        <button>← Back</button>
      </Link>
      <h1 className="title">Task Details</h1>
      <TaskDetails task={task} onDelete={deleteTask} />
      <h2 className = "subtitle" > Update Task </h2>
      <TaskForm task={task} onSubmit={updateTask} />
      <div className="button-group">
        <button className="delete-button" onClick={deleteTask}>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskPage;