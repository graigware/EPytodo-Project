const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
  getUserById,
  getUserByEmailOrId,
  getUserTodos,
  updateUser,
  deleteUser
} = require('./user.query');

router.get('/', (req, res) =>
{
  const userId = req.user.id;
  
  getUserById(userId, (err, user) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    if (!user)
        return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(user);
  });
});

router.get('/todos', (req, res) =>
{
  const userId = req.user.id;
  
  getUserTodos(userId, (err, todos) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    res.status(200).json(todos);
  });
});

router.get('/:identifier', (req, res) =>
{
  const { identifier } = req.params;
  
  getUserByEmailOrId(identifier, (err, user) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    if (!user)
        return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(user);
  });
});

router.put('/:id', (req, res) =>
{
  const { id } = req.params;
  const { email, password, firstname, name } = req.body;
  
  if (!email || !password || !firstname || !name)
    return res.status(400).json({ msg: 'Bad parameter' });
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userData = { email, password: hashedPassword, firstname, name };
  updateUser(id, userData, (err, updatedUser) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    if (!updatedUser)
        return res.status(404).json({ msg: 'Not found' });
    res.status(200).json(updatedUser);
  });
});

router.delete('/:id', (req, res) =>
{
  const { id } = req.params;
  
  deleteUser(id, (err, result) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    res.status(200).json(result);
  });
});

module.exports = router;