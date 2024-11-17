import React, { useState } from "react";
import "../../App.css";

function ToDo({ task, toggleComplete, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      updateTask(newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task">
      {/* Checkbox */}
      <input
        type="checkbox"
        className="complete-checkbox"
        checked={task.isCompleted}
        onChange={toggleComplete}
      />

      {/* Task Details */}
      <div>
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="edit-input"
          />
        ) : (
          <span className={task.isCompleted ? "completed" : ""}>
            <span className="task-text">{task.text}</span>
            <span className="task-category">{task.category}</span>
            <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            {task.dueDate && <span className="task-due-date">Due: {task.dueDate}</span>}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="edit" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="delete" onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}

export default ToDo;
