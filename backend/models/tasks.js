const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Export the Task model
module.exports = mongoose.model('Task', taskSchema);
