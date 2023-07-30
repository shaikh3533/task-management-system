import React from 'react';
import "../styles/TaskList.css"

function TaskList({ tasks, onCompleteTask, onDeleteTask, authenticatedGroup, userRole }) {
  const filteredTasks = userRole === 'admin' ? tasks : tasks.filter((task) => task.groupId === authenticatedGroup);

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <div className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
          <div className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-actions">
              <button onClick={() => onCompleteTask(task.id, !task.completed)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
