const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDataAccess = require('../data_access/userDataAccess');
const mail_sender = require('../config/mail_sender'); 

const registerUser = async (nombre, correo, contraseña) => {
  const usuarioExistente = await userDataAccess.getUserByEmail(correo);
  if (usuarioExistente) {
    throw new Error('El correo ya está registrado');
  }

  const hash = await bcrypt.hash(contraseña, 10);

  return await userDataAccess.createUser({ nombre, correo, contraseña: hash });
};

const loginUser = async (correo, contraseña) => {
  const usuario = await userDataAccess.getUserByEmail(correo);
  if (!usuario) {
    throw new Error('Correo o contraseña incorrectos');
  }

  const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!esValido) {
    throw new Error('Correo o contraseña incorrectos');
  }

  const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

const getUserDetails = async (id_usuario) => {
  const usuario = await userDataAccess.getUserById(id_usuario);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  return usuario;
};

const updateUserProfile = async (id_usuario, userData) => {
  const updatedUser = await userDataAccess.updateUser(id_usuario, userData);
  if (!updatedUser) {
    throw new Error('Usuario no encontrado');
  }
  return updatedUser;
};

const removeUser = async (id_usuario) => {
  const deletedUser = await userDataAccess.deleteUser(id_usuario);
  if (!deletedUser) {
    throw new Error('Usuario no encontrado');
  }
  return deletedUser;
};

const requestPasswordReset = async (correo) => {
  const usuario = await userDataAccess.getUserByEmail(correo);
  if (!usuario) {
    throw new Error('El correo no está registrado');
  }

  const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const resetLink = `http://localhost:3000/api/users/reset-password?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: correo,
    subject: 'Recuperación de contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
  });

  return { message: 'Correo de recuperación enviado' };
};

const resetPassword = async (token, nuevaContraseña) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await userDataAccess.getUserById(decoded.id_usuario);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const hash = await bcrypt.hash(nuevaContraseña, 10);
    await userDataAccess.updateUser(usuario.id_usuario, { contraseña: hash });

    return { message: 'Contraseña actualizada con éxito' };
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

const changePassword = async (id_usuario, contraseñaActual, nuevaContraseña) => {
  const usuario = await userDataAccess.getUserById(id_usuario);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const esValido = await bcrypt.compare(contraseñaActual, usuario.contraseña);
  if (!esValido) {
    throw new Error('La contraseña actual es incorrecta');
  }

  const hash = await bcrypt.hash(nuevaContraseña, 10);
  await userDataAccess.updateUser(id_usuario, { contraseña: hash });

  return { message: 'Contraseña actualizada con éxito' };
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserProfile,
  removeUser,
  requestPasswordReset,
  resetPassword,
  changePassword
};
