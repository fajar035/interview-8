const db = require('../config/db');

function allUsers() {
  return new Promise((resolve, reject) => {
    const url = `SELECT * FROM users`;
    db.query(url, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

function detailUser(id) {
  return new Promise((resolve, reject) => {
    const url = `SELECT * FROM users WHERE id = ?`;
    db.query(url, [id], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

function addUser(body) {
  return new Promise((resolve, reject) => {
    const { email, fullname } = body;
    const url = `INSERT INTO users VALUES(null, ?, ?)`;
    db.query(url, [email, fullname], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

function updateUser(id, body) {
  return new Promise((resolve, reject) => {
    const { email, fullname } = body;
    const url = `UPDATE users SET email = ?, fullname = ? WHERE id = ?`;
    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
      db.query(url, [email, fullname, id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const url = `DELETE FROM users WHERE id = ?`;
    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
      db.query(url, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
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
