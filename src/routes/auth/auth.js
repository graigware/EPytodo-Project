const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail, registerUser } = require('./auth.query');

router.post('/register', (req, res) =>
{
  const { email, password, name, firstname } = req.body;

  if (!email || !password || !name || !firstname)
      return res.status(400).json({ msg: 'Bad parameter' });
  getUserByEmail(email, (err, existingUser) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    if (existingUser)
        return res.status(400).json({ msg: 'Account already exists' });
    const hashedPassword = bcrypt.hashSync(password, 10);
    registerUser(email, hashedPassword, name, firstname, (err, userId) => {
      if (err)
          return res.status(500).json({ msg: 'Internal server error' });
      const token = jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    });
  });
});

router.post('/login', (req, res) =>
{
  const { email, password } = req.body;

  if (!email || !password)
      return res.status(400).json({ msg: 'Bad parameter' });
  getUserByEmail(email, (err, user) => {
    if (err)
        return res.status(500).json({ msg: 'Internal server error' });
    if (!user)
        return res.status(400).json({ msg: 'Invalid Credentials' });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
        return res.status(400).json({ msg: 'Invalid Credentials' });
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

module.exports = router;
