// Importing necessary hooks and CSS from React and local files
import React, { useState, useEffect } from 'react';
import './TaskForm.css'; 

// This is a functional component that takes in a task object and a function to handle form submission
const TaskForm = ({ task, onSubmit }) => {
  // These are state variables for the form fields. If a task is passed in, it initializes the state with the task's values
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');

  // This effect runs when the task prop changes. It updates the state variables with the new task's values
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  // This function handles form submission. It prevents the default form submission, calls the onSubmit prop with the form data, and then resets the form fields
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  // This is the component's return statement. It renders a form with inputs for title, description, and due date, and a submit button
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <button type="submit" className="submit-button">
        Save
      </button>
    </form>
  );
};

// The component is exported for use in other parts of the application
export default TaskForm;