// Importing necessary modules and components from React and local files
import React, { useState, useEffect, useRef } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

// This is a functional component for the landing page
const LandingPage = () => {
  // These are state variables for the tasks and a reference to the task list
  const [tasks, setTasks] = useState([]);
  const taskListRef = useRef(null);

  // This effect runs when the component mounts. It fetches the tasks from the backend and sets the tasks state variable
  useEffect(() => {
    fetch('https://task-management-backend-89n5.onrender.com/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // This function handles adding a task. It sends a POST request to the backend with the task data, then updates the tasks state variable
  const addTask = (task) => {
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

  // This function handles deleting a task. It sends a DELETE request to the backend, then updates the tasks state variable
  const deleteTask = (id) => {
    fetch(`https://task-management-backend-89n5.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  // These functions handle scrolling up and down in the task list
  const scrollUp = () => {
    taskListRef.current.scrollBy({ top: -350, behavior: 'smooth' });
  };
  const scrollDown = () => {
    taskListRef.current.scrollBy({ top: 350, behavior: 'smooth' });
  };

  // This is the component's return statement. It renders a form for adding tasks, a list of tasks, and buttons for scrolling up and down in the list
  return (
    <div className="container">
      <h1 className="title">Task Management</h1>
      <div className="form-container">
        <TaskForm onSubmit={addTask} />
      </div>
      <h2 className="heading">Tasks</h2>
      {tasks.length > 1 && (
        <p className="scroll-message">Scroll down for more tasks</p>
      )}
      <div className="task-list-container" ref={taskListRef}>
        {tasks.length === 0 ? (
          <p className="no-tasks-message">
            No tasks as of now. Add tasks by filling the form above.
          </p>
        ) : (
          <TaskList tasks={tasks} onDelete={deleteTask} />
        )}
      </div>
      {tasks.length > 1 && (
        <div className="scroll-buttons">
          <button className="scroll-button" onClick={scrollUp}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className="scroll-button" onClick={scrollDown}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      )}
    </div>
  );
};

// The component is exported for use in other parts of the application
export default LandingPage;