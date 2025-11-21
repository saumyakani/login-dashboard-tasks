
import { useReducer, useEffect } from 'react';


const getInitialState = (key, initialValue) => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
        console.error("Error reading localStorage key “" + key + "”: ", error);
        return initialValue;
    }
};


const taskReducer = (tasks, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [{
                id: Date.now(),
                task: action.payload,
                created: new Date().toISOString(),
                modified: null,
            }, ...tasks];

        case 'EDIT_TASK':
            return tasks.map((task) =>
                task.id === action.payload.id
                    ? {
                        ...task,
                        task: action.payload.newText,
                        modified: new Date().toISOString(),
                    }
                    : task
            );

        case 'DELETE_TASK':
            return tasks.filter((task) => task.id !== action.payload);

        default:
            return tasks;
    }
};


export const useTasks = (localStorageKey) => {
    const [tasks, dispatch] = useReducer(
        taskReducer, 
        [], 
        () => getInitialState(localStorageKey, [])
    );

    useEffect(() => {
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(tasks));
        } catch (error) {
            console.error("Error setting localStorage key “" + localStorageKey + "”: ", error);
        }
    }, [localStorageKey, tasks]);

   
    const addTask = (text) => dispatch({ type: 'ADD_TASK', payload: text });
    const editTask = (id, newText) => dispatch({ type: 'EDIT_TASK', payload: { id, newText } });
    const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });

    return { tasks, addTask, editTask, deleteTask };
};