import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((res) => {
        addTask(res.data);
        setNewTask({ title: "", description: "", dueDate: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task Title"
      />
      <input
        type="text"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        placeholder="Task Description"
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
