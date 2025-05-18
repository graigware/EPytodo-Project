const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require('./todos.query');

router.get('/', (req, res) =>
{
  getAllTodos((err, todos) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    res.status(200).json(todos);
  });
});

router.get('/:id', (req, res) =>
{
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ msg: 'Bad parameter' });
  getTodoById(id, (err, todo) => {
    if (err) return res.status(500).json({ msg: 'Internal server error' });
    if (!todo) return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(todo);
  });
});

router.post('/', (req, res) =>
{
  const { title, description, due_time, user_id, status } = req.body;
  const todoData = { title, description, due_time, user_id, status };

  if (!title || !description || !due_time || !user_id)
      return res.status(400).json({ msg: 'Bad parameter' });
  createTodo(todoData, (err, newTodo) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    res.status(201).json(newTodo);
  });
});

router.put('/:id', (req, res) =>
{
  const { id } = req.params;
  const { title, description, due_time, user_id, status } = req.body;

  if (!title || !description || !due_time || !user_id || !status || isNaN(id))
    return res.status(400).json({ msg: 'Bad parameter' });
  const todoData = { title, description, due_time, user_id, status };
  updateTodo(id, todoData, (err, updatedTodo) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    if (!updatedTodo)
        return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(updatedTodo);
  });
});

router.delete('/:id', (req, res) =>
  {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ msg: 'Bad parameter' });
  deleteTodo(id, (err, result) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    res.status(200).json(result);
  });
});

module.exports = router;