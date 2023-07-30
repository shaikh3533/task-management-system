import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onCompleteTask, onDeleteTask }) {
  const { id, title, description, completed } = task;

  return (
    <div className={`task-item${completed ? ' completed' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="button-container">
        <button onClick={() => onCompleteTask(id)}>{completed ? 'Mark Incomplete' : 'Mark Completed'}</button>
        <button onClick={() => onDeleteTask(id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
