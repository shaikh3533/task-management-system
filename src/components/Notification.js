// Notification.js
import React from 'react';

function Notification({ message, type, onClose }) {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Dismiss</button>
    </div>
  );
}

export default Notification;
