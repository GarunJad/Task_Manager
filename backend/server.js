const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// Import the Task model
const Task = require('./models/tasks');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
// Routes
// GET all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create a new task
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
