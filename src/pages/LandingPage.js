import React, { useState, useEffect, useRef } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

const LandingPage = () => {
  const [tasks, setTasks] = useState([]);
  const taskListRef = useRef(null);

  useEffect(() => {
    fetch('https://task-management-backend-89n5.onrender.com/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

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

  const scrollUp = () => {
    taskListRef.current.scrollBy({ top: -350, behavior: 'smooth' });
  };

  const scrollDown = () => {
    taskListRef.current.scrollBy({ top: 350, behavior: 'smooth' });
  };

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

export default LandingPage;
