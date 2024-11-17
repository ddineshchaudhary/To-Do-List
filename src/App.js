import React, { useState, useEffect } from 'react';
import ToDo from './components/ToDo/ToDo';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskCategory, setTaskCategory] = useState("General");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        text: taskInput,
        category: taskCategory,
        priority: taskPriority,
        dueDate: taskDueDate,
        isCompleted: false,
        subtasks: []
      };

      // Update tasks state and reset input fields
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setTaskCategory("General");
      setTaskPriority("Medium");
      setTaskDueDate("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Update localStorage with the new tasks list
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    // Update localStorage after the task completion status is toggled
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    // Update localStorage after the task is updated
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <p>{`Completed Tasks: ${tasks.filter(task => task.isCompleted).length} / ${tasks.length}`}</p>

      {/* Task Input */}
      <div className="task-input">
        {/* Full-width Task Input */}
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
          className="task-input-bar"
        />

        {/* Row with other options */}
        <div className="task-input-options">
          <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
            <option value="" disabled selected>Select Category</option>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
            <option value="" disabled selected>Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <ToDo
            key={index}
            task={task}
            toggleComplete={() => toggleCompleteTask(index)}
            deleteTask={() => deleteTask(index)}
            updateTask={(newText) => updateTask(index, newText)}
          />
        ))}
      </div>
      <div className='footer'>
        &copy; 2024 Developed by Dinesh Chaudhary D.
      </div>
    </div>
  );
}

export default App;
