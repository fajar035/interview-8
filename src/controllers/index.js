const userModels = require('../models');
const response = require('../helpers/responses');

const allUsers = async (req, res) => {
  try {
    const result = await userModels.allUsers();
    return response.success(res, 200, result);
  } catch (err) {
    return response.failed(res, 500, err);
  }
};

const detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModels.detailUser(id);
    if (result.length === 0) {
      return response.success(res, 404, {
        message: 'Data not found',
      });
    }
    return response.success(res, 200, result[0]);
  } catch (err) {
    return response.failed(res, 500, err);
  }
};

const addUser = async (req, res) => {
  try {
    const { body } = req;
    const result = await userModels.addUser(body);
    return response.success(res, 200, result);
  } catch (err) {
    return response.failed(res, 500, err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await userModels.updateUser(id, body);
    return response.success(res, 200, result);
  } catch (err) {
    return response.failed(res, 500, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModels.deleteUser(id);
    return response.success(res, 200, result);
  } catch (err) {
    return response.failed(res, 500, err);
  }
};

module.exports = {
  allUsers,
  detailUser,
  addUser,
  updateUser,
  deleteUser,
};
