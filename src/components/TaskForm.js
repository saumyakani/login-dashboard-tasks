
import React, { useState } from 'react';

function TaskForm({ addTask }) {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            addTask(taskText.trim());
            setTaskText('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Enter a weekly task entry..."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;