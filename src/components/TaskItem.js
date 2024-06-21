import React from 'react';
import { Link } from 'react-router-dom';
import './TaskItem.css'; // You'll need to create this CSS file

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="title">{task.title}</h2>
        <p className="description">
          {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
        </p>
        <Link to={`/task/${task.id}`} className="view-details-link">
          <button className="view-details-button">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;