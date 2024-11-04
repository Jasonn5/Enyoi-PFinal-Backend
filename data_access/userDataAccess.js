const { User } = require('../models');

const getUserByEmail = async (correo) => {
  return await User.findOne({ where: { correo } });
};

const getUserById = async (id_usuario) => {
  return await User.findByPk(id_usuario);
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const updateUser = async (id_usuario, userData) => {
  const user = await User.findByPk(id_usuario);
  if (user) {
    return await user.update(userData);
  }
  return null;
};

const deleteUser = async (id_usuario) => {
  const user = await User.findByPk(id_usuario);
  if (user) {
    return await user.destroy();
  }
  return null;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
