import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css'; // You'll need to create this CSS file

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {[...tasks].reverse().map(task => (
        <div className="task-item-container" key={task.id}>
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;