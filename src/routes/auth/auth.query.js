const db = require('../../config/db');

function getUserByEmail(email, callback) {
  const sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}

function registerUser(email, hashedPassword, name, firstname, callback)
{
  const sql = 'INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)';

  db.query(sql, [email, hashedPassword, name, firstname], (err, result) => {
    if (err)
        return callback(err);
    callback(null, result.insertId);
  });
}

module.exports = {
  getUserByEmail,
  registerUser
};