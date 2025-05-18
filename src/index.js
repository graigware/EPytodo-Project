require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todoRoutes = require('./routes/todos/todos');
const notFound = require('./middleware/notFound');
const authMiddleware = require('./middleware/auth');

app.use(express.json());

app.use('/', authRoutes);

app.use('/user', authMiddleware, userRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});