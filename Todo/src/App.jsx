

import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskDate, setEditTaskDate] = useState('');
  const [editTaskImage, setEditTaskImage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setInputDate(event.target.value);
  };

  const handleImageChange = (event) => {
    setInputImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '' && inputDate.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, date: inputDate, image: inputImage, completed: false }]);
      setInputValue('');
      setInputDate('');
      setInputImage('');
    }
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleTaskEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
    setEditTaskDate(task.date);
    setEditTaskImage(task.image);
  };

  const handleTaskUpdate = () => {
    setTasks(tasks.map(task => {
      if (task.id === editTaskId) {
        return { ...task, text: editTaskText, date: editTaskDate, image: editTaskImage };
      }
      return task;
    }));
    setEditTaskId(null);
    setEditTaskText('');
    setEditTaskDate('');
    setEditTaskImage('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter task..." />
        <input type="date" value={inputDate} onChange={handleDateChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editTaskId === task.id ? (
              <>
                <input type="text" value={editTaskText} onChange={(e) => setEditTaskText(e.target.value)} />
                <input type="date" value={editTaskDate} onChange={(e) => setEditTaskDate(e.target.value)} />
                <img src={editTaskImage} alt="Task" />
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <span>{task.date}</span>
                {task.image && <img src={task.image} alt="Task" />}
              </>
            )}
            <div>
              {editTaskId === task.id ? (
                <button onClick={handleTaskUpdate}>Update</button>
              ) : (
                <button onClick={() => handleTaskEdit(task)}>Edit</button>
              )}
              <button onClick={() => handleTaskComplete(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
              <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;