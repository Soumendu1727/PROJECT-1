import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
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
  };

  const handleTaskUpdate = () => {
    setTasks(tasks.map(task => {
      if (task.id === editTaskId) {
        return { ...task, text: editTaskText };
      }
      return task;
    }));
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter task..." />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editTaskId === task.id ? (
              <input type="text" value={editTaskText} onChange={(e) => setEditTaskText(e.target.value)} />
            ) : (
              <span>{task.text}</span>
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