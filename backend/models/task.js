const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['Open', 'InProgress', 'Completed'],
    default: 'Open'
  }
});

module.exports = mongoose.model('Task', taskSchema);
