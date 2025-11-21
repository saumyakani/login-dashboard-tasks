import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useTasks } from "./hooks/useTasks";
import "./styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEventData, setLoginEventData] = useState(null);

  const { tasks, addTask, editTask, deleteTask } = useTasks("weeklyTasks");

  const handleLoginSuccess = (data) => {
    setLoginEventData(data);
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="fullscreen-wrapper">
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <div className="fullscreen-wrapper">
          <div className="app">
            <Dashboard
              loginData={loginEventData}
              tasks={tasks}
              addTask={addTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      )}
    </>
  );
}


export default App;
