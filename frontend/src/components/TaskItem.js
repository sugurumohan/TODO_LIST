import React, { useState } from "react";
import axios from "axios";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/tasks/${task._id}`, editedTask)
      .then((res) => {
        updateTask(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/tasks/${task._id}`)
      .then(() => deleteTask(task._id))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
        />
      ) : (
        <span>{task.title}</span>
      )}
      <button onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
