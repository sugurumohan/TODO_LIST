import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
