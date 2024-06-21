// Importing necessary modules and components from React and local files
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';
import './TaskPage.css'; 

// This is a functional component for a page that displays a task's details and a form for updating the task
const TaskPage = () => {
  // This hook gets the task id from the URL parameters
  const { id } = useParams();
  // This is a state variable for the task
  const [task, setTask] = useState(null);

  // This effect runs when the component mounts or the id changes. It fetches the task's details from the backend and sets the task state variable
  useEffect(() => {
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  // This function handles updating the task. It sends a PUT request to the backend with the updated task data, then updates the task state variable
  const updateTask = (updatedTask) => {
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

  // This function handles deleting the task. It sends a DELETE request to the backend, then redirects to the home page
  const deleteTask = () => {
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(() => window.location.href = '/')
    .catch(error => console.error('Error deleting task:', error));
  };

  // If the task is not loaded yet, it displays a loading message
  if (!task) return <div>Loading...</div>;

  // This is the component's return statement. It renders a link to go back to the home page, the task's details, a form for updating the task, and a button for deleting the task
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

// The component is exported for use in other parts of the application
export default TaskPage;