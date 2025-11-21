
import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Dashboard({ loginData, tasks, addTask, editTask, deleteTask }) {
    
    const { deviceDetails, geolocation, timestamp } = loginData;

    return (
        <div className="dashboard-container">
            <h2>Welcome! Event Data Captured Successfully</h2>
            <div className="login-data-display">
                <p><strong>Login Time:</strong> {new Date(timestamp).toLocaleString()}</p>
                
                <h3>Device Details</h3>
                <p><strong>OS:</strong> {deviceDetails.os}</p>
                <p><strong>Browser:</strong> {deviceDetails.browser}</p>
                <details>
                    <summary>Raw User Agent</summary>
                    <p>{deviceDetails.rawAgent}</p>
                </details>
                
                <h3>Geolocation</h3>
                {geolocation.error ? (
                    <p className="error">Location Error: {geolocation.error}</p>
                ) : (
                    <>
                        <p><strong>Latitude:</strong> {geolocation.latitude}</p>
                        <p><strong>Longitude:</strong> {geolocation.longitude}</p>
                        <p><strong>Accuracy:</strong> {geolocation.accuracy} meters</p>
                    </>
                )}
            </div>

            <hr />

            <div className="weekly-tasks-section">
                <h2>Weekly Task Entries</h2>
                <TaskForm addTask={addTask} />
                <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
            </div>
        </div>
    );
}

export default Dashboard;