const db = require('../../config/db');

function getAllTodos(callback)
{
  const sql = 'SELECT * FROM todo';

  db.query(sql, (err, results) => {
    if (err)
        return callback(err);
    callback(null, results);
  });
}

function getTodoById(id, callback)
{
  const sql = 'SELECT * FROM todo WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err)
        return callback(err);
    callback(null, results[0]);
  });
}

function createTodo(todoData, callback)
{
  const { title, description, due_time, user_id, status } = todoData;
  const sql = 'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [title, description, due_time, user_id, status || 'not started'], (err, result) => {
    if (err)
        return callback(err);
    getTodoById(result.insertId, callback);
  });
}

function updateTodo(id, todoData, callback)
{
  const { title, description, due_time, user_id, status } = todoData;
  const sql = 'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?';
  
  db.query(sql, [title, description, due_time, user_id, status, id], (err, result) => {
    if (err)
        return callback(err);
    getTodoById(id, callback);
  });
}

function deleteTodo(id, callback)
{
  const sql = 'DELETE FROM todo WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err)
        return callback(err);
    callback(null, { msg: `Successfully deleted record number: ${id}` });
  });
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};