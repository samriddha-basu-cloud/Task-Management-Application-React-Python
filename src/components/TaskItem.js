// Importing necessary modules and CSS from React, react-router-dom and local files
import React from 'react';
import { Link } from 'react-router-dom';
import './TaskItem.css'; 

// This is a functional component that takes in a task object and a function to handle deletion
const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="card">
      <div className="card-content">
         <h2 className="title">{task.title}</h2>
        {/* The task's description is displayed in a p element. If the description is longer than 35 characters, it's truncated and "..." is added at the end */}
        <p className="description">
          {task.description.length > 35 ? `${task.description.substring(0, 35)}...` : task.description}
        </p>
        {/* There's a Link component from react-router-dom that links to the task's detail page */}
        <Link to={`/task/${task.id}`} className="view-details-link">
          {/* Inside the Link, there's a button that the user can click to go to the task's detail page */}
          <button className="view-details-button">View Details</button>
        </Link>
      </div>
    </div>
  );
};

// The component is exported for use in other parts of the application
export default TaskItem;