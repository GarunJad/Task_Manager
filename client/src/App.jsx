import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      if (!newTask.title) {
        alert('Title is required');
        return;
      }
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      const updatedTasks = tasks.map(task =>
        task._id === id ? response.data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async id => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700">Task Management</h1>

        {/* Task input form */}
        <div className="mt-8 flex justify-between space-x-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={createTask}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg"
          >
            Add Task
          </button>
        </div>

        {/* Task list */}
        <div className="mt-8 space-y-4">
          {tasks.map(task => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-gray-50 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h2>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => updateTask(task._id, { ...task, completed: !task.completed })}
                  className={`py-2 px-4 rounded-lg shadow ${
                    task.completed ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
