import React, { useState, useEffect } from 'react';
import './styles/App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import { users } from './Data/usersData';
import { fetchTasks, addTask, updateTask, deleteTask } from './mockAPI/mockAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticatedGroup, setAuthenticatedGroup] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const authenticatedGroupId = localStorage.getItem('authenticatedGroup');
    if (authenticatedGroupId !== null) {
      setLoggedIn(true);
      setAuthenticatedGroup(parseInt(authenticatedGroupId, 10));
      const authenticatedUser = users.find((user) => user.id === `user${authenticatedGroupId}`);
      if (authenticatedUser) {
        setUserRole(authenticatedUser.isAdmin ? 'admin' : 'user');
        fetchTasks(parseInt(authenticatedGroupId, 10)).then((tasksForGroup) => {
          setTasks(tasksForGroup);
        });
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (groupId, role) => {
    setLoggedIn(true);
    setAuthenticatedGroup(groupId);
    setUserRole(role);
    localStorage.setItem('authenticatedGroup', groupId);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAuthenticatedGroup(null);
    setUserRole('');
    localStorage.removeItem('authenticatedGroup');
  };

  const handleAddTask = (newTask) => {
    addTask(newTask)
      .then((addedTask) => {
        setTasks([...tasks, addedTask]);
        showNotification('Task added successfully!', 'success');
      })
      .catch((error) => {
        showNotification('Failed to add task.', 'error');
      });
  };

  const handleCompleteTask = (taskId, completed) => {
    updateTask(taskId, completed)
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, completed: updatedTask.completed } : task))
        );
        showNotification('Task updated successfully!', 'success');
      })
      .catch((error) => {
        showNotification('Failed to update task.', 'error');
      });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        showNotification('Task deleted successfully!', 'success');
      })
      .catch((error) => {
        showNotification('Failed to delete task.', 'error');
      });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header bg-primary py-2 px-4 rounded mb-4 d-flex justify-content-between align-items-center">
        <h1 className="text-white m-0">Task Management System</h1>
        {loggedIn ? (
          <div>
            <button className="btn btn-light me-2" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn btn-light" onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </header>
      {loggedIn && (
        <div className="container">
          {notification && (
            <div
              className={`toast show position-fixed ${notification.type === 'success' ? 'bg-success' : 'bg-danger'}`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{ top: '20px', right: '20px', zIndex: '1', maxWidth: '300px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
              <div className={`text-white ${notification.type === 'success' ? 'bg-success' : 'bg-danger'} px-3 py-2 rounded`}>
                {notification.message}
              </div>
            </div>
          )}
          <TaskForm onAddTask={handleAddTask} authenticatedGroup={authenticatedGroup} />
          <TaskList
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            authenticatedGroup={authenticatedGroup}
            userRole={userRole}
          />
        </div>
      )}
    </div>
  );
}

export default App;
