
import React, { useState } from 'react';
import { formatDateTime, formatTimeDifference } from '../utils/timeUtils'; 

function TaskItem({ task, editTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.task);
    const [error, setError] = useState('');
    const handleEditSave = () => {
        if (editText.trim().length < 5) {
            setError('Task must be at least 5 characters long.');
            return;
        }
        if (editText.trim() !== task.task.trim()) {
            editTask(task.id, editText.trim());
        }
        setIsEditing(false);
        setError('');
    };

    const handleCancel = () => {
        setIsEditing(false); 
        setEditText(task.task);
        setError('');
    };
    const displayTime = task.modified ? formatTimeDifference(task.modified) : formatDateTime(task.created);
    const timeLabel = task.modified ? 'Last Modified' : 'Created';
    return (
        <li className="task-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => { setEditText(e.target.value); setError(''); }}
                    />
                    {error && <p className="input-error">{error}</p>}
                    <div className="task-actions">
                        <button onClick={handleEditSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <span className="task-text">{task.task}</span>
                    <div className="task-meta">
                        <small>{timeLabel}: **{displayTime}**</small>
                        {task.modified && <small className="creation-time"> | Created: {formatDateTime(task.created)}</small>}
                    </div>
                    <div className="task-actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TaskItem;