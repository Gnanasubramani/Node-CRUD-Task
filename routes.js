const express = require('express');
const router = express.Router();
const Task = require('./models/Tasks');

// CREATE
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// READ ALL
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// READ ONE
router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('Not found');
  res.json(task);
});

// UPDATE
router.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE
router.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
