const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');

const app = express();

// DB Connection
mongoose.connect('mongodb+srv://akshay:' + process.env.MONGO_ATLAS_PW + '@cluster0.mabdu.mongodb.net/todo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected!');
  })
  .catch(() => {
    console.log('DB connection failed!');
  });

  // Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Add Task
app.post('/api/tasks', (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });
  task.save().then(result => {
    res.status(201).json({
      message: 'Task created successfully!',
      task: {
        id: result._id,
        name: result.name,
        description: result.description,
        status: result.status
      }
    });
  });
});

// Get All Tasks
app.get('/api/tasks', (req, res, next) => {
  Task.find().then(result => {
    res.status(200).json({
     tasks: result
    });
  });
});

// update In Progress status
app.put('/api/tasks/:id', (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });
  // console.log(task);
  Task.updateOne({ _id: req.params.id }, task).then(result => {
    // console.log(result);
    res.status(200).json({
      message: 'Task updated!'
    });
  });
});

module.exports = app;
