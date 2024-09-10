import React, { useState } from "react";
import TaskForm from "./component/TaskForm";
import TaskList from "./component/TaskList";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Update a task
  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], ...updatedTask };
    setTasks(newTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Task Management</h2>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
