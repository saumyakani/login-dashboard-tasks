
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, editTask, deleteTask }) {
    if (tasks.length === 0) {
        return <p className="no-tasks">No tasks added yet. Start logging your work!</p>;
    }
    
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                />
            ))}
        </ul>
    );
}

export default TaskList;