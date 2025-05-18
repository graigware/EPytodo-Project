const db = require('../../config/db');

const getUserById = (id, callback) =>
{
    const query = 'SELECT * FROM user WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) 
            return callback(err, null);
        if (results.length === 0) 
            return callback(null, null);
        const user = results[0];
        return callback(null, user);
    });
};

const getUserByEmailOrId = (identifier, callback) =>
{
    let query = 'SELECT * FROM user WHERE ';
    let param = identifier;
    if (!isNaN(identifier))
        query += 'id = ?';
    else
        query += 'email = ?';
    db.query(query, [param], (err, results) => {
        if (err)
            return callback(err, null);
        if (results.length === 0)
            return callback(null, null);
        
        const user = results[0];
        return callback(null, user);
    });
};

const getUserTodos = (userId, callback) =>
{
    const query = 'SELECT * FROM todo WHERE user_id = ?';
    
    db.query(query, [userId], (err, results) => {
        if (err)
            return callback(err, null);
        return callback(null, results);
    });
};

const updateUser = (id, userData, callback) =>
{
    getUserById(id, (err, user) => {
        if (err)
            return callback(err, null);
        if (!user)
            return callback(null, null);
        const query = 'UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?';
        const params = [userData.email, userData.password, userData.firstname, userData.name, id];
        db.query(query, params, (err, result) => {
            if (err)
                return callback(err, null);
            getUserById(id, callback);
        });
    });
};

const deleteUser = (id, callback) =>
{
    getUserById(id, (err, user) => {
        if (err)
            return callback(err, null);
        if (!user)
            return callback(null, { msg: 'Not found' });
        const query = 'DELETE FROM user WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err)
                return callback(err, null);
            return callback(null, { msg: `Successfully deleted record number: ${id}` });
        });
    });
};

module.exports = {
    getUserById,
    getUserByEmailOrId,
    getUserTodos,
    updateUser,
    deleteUser
};
