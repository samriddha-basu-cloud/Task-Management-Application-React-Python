import React, { useState, useEffect } from 'react';
import './TaskForm.css'; // You'll need to create this CSS file

const TaskForm = ({ task, onSubmit }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate });
  };

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

export default TaskForm;