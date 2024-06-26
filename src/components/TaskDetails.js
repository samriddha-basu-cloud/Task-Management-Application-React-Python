// Importing necessary modules and CSS from React and local files
import React, { useState } from 'react';
import './TaskDetails.css'; 

// This function takes an ISO date string and returns a formatted date string
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

// This function takes a due date and returns the number of days left until that date
const calculateDaysLeft = (dueDate) => {
  const currentDate = new Date();
  const dueDateTime = new Date(dueDate);
  const timeDiff = dueDateTime.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;

  return daysLeft;
};

// This is a functional component for a modal that displays a task's full description
const DescriptionModal = ({ open, handleClose, description }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Full Description</h2>
        <span className = "scroll-message" > Scroll→ </span>
        <p className="description">{description}</p>
        <button className="close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

// This is a functional component for a task's details
const TaskDetails = ({ task, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const formattedDueDate = formatDate(task.dueDate);
  const daysLeft = calculateDaysLeft(task.dueDate);
  const truncatedDescription = task.description.length > 25 ? `${task.description.substring(0, 25)}...` : task.description;

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="task-title">{task.title}</h2>
        <p className="description">
          {truncatedDescription}
          {task.description.length > 25 && (
            <>
              <button className="view-more-button" onClick={handleModalOpen}>
                View Full Description
              </button>
            </>
          )}
        </p>
        <p className="task-details">
          <strong>Due Date:</strong> {formattedDueDate} <br />
          <strong>Days Left:</strong> {daysLeft}
        </p>
        <DescriptionModal open={modalOpen} handleClose={handleModalClose} description={task.description} />
      </div>
    </div>
  );
};

// The component is exported for use in other parts of the application
export default TaskDetails;