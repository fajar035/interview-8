const db = require('../config/db');

function allUsers() {
  return new Promise((resolve, reject) => {
    const url = `SELECT * FROM users`;
    db.query(url, (err, result) => {
      if (err) {
        return reject({
          error: {
            sql: err.sql,
            message: err.message,
          },
        });
      }
      if (result.length === 0) {
        return reject({
          error: {
            message: 'Data not found',
          },
        });
      }
      return resolve({ data: result });
    });
  });
}

function detailUser(id) {
  return new Promise((resolve, reject) => {
    const url = `SELECT * FROM users WHERE id = ?`;
    db.query(url, [id], (err, result) => {
      if (err) {
        return reject({
          error: {
            sql: err.sql,
            message: err.message,
          },
        });
      }
      if (result.length === 0) {
        return reject({
          error: {
            message: 'Data not found',
          },
        });
      }
      return resolve({ data: result });
    });
  });
}

function addUser(body) {
  return new Promise((resolve, reject) => {
    const { email, fullname } = body;
    const url = `INSERT INTO users VALUES(null, ?, ?)`;
    db.query(url, [email, fullname], (err, result) => {
      if (err) {
        return reject({
          error: {
            sql: err.sql,
            message: err.message,
          },
        });
      }
      return resolve({
        data: {
          email,
          fullname,
        },
        message: 'Successfully add data',
      });
    });
  });
}

function updateUser(id, body) {
  return new Promise((resolve, reject) => {
    const { email, fullname } = body;
    const url = `UPDATE users SET email = ?, fullname = ? WHERE id = ?`;
    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, result) => {
      if (err) {
        return reject({
          error: {
            sql: err.sql,
            message: err.message,
          },
        });
      }

      if (result.length === 0) {
        return reject({
          error: {
            message: 'ID data not found',
          },
        });
      }

      db.query(url, [email, fullname, id], (err, result) => {
        if (err) {
          return reject({
            error: {
              sql: err.sql,
              message: err.message,
            },
          });
        }
        return resolve({
          data: {
            id,
            email,
            fullname,
          },
          message: 'Successfully update data',
        });
      });
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const url = `DELETE FROM users WHERE id = ?`;
    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, result) => {
      if (err) {
        return reject({
          error: {
            sql: err.sql,
            message: err.message,
          },
        });
      }
      if (result.length === 0) {
        return reject({
          error: {
            message: 'ID data not found',
          },
        });
      }
      const { id, email, fullname } = result[0];
      db.query(url, [id], (err, result) => {
        if (err) {
          return reject({
            error: {
              sql: err.sql,
              message: err.message,
            },
          });
        }
        return resolve({
          data: {
            id,
            email,
            fullname,
          },
          message: 'Successfully delete data',
        });
      });
    });
  });
}

module.exports = {
  allUsers,
  detailUser,
  addUser,
  updateUser,
  deleteUser,
};
