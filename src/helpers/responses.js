const success = (res, status, data) => {
  res.status(status).json(data);
};

const failed = (res, status, data) => {
  res.status(status).json(data);
};

module.exports = { success, failed };
