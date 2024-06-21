// Importing necessary modules and CSS from React and local files
import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

// This is a functional component that takes in an array of tasks as a prop
const TaskList = ({ tasks }) => {
  return (
    // The component returns a div with a class of "task-list"
    <div className="task-list">
      {/*  Inside the div, it maps over the tasks array in reverse order (so the latest task is shown first)
     For each task, it creates a new div with a class of "task-item-container" and a unique key of the task's id */}
      {[...tasks].reverse().map(task => (
        <div className="task-item-container" key={task.id}>
          {/*  Inside the div, it renders a TaskItem component and passes the current task as a prop */}
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
};

// The component is exported for use in other parts of the application
export default TaskList;