import React, { useState } from 'react';
import "../styles/TaskForm.css"

function TaskForm({ onAddTask, authenticatedGroup }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            groupId: authenticatedGroup,
            title,
            description,
            completed: false,
        };
        onAddTask(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} />
            </div>
            <div className="input-container">
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={handleDescriptionChange} />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;


