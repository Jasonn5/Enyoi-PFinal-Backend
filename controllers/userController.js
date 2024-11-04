const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const nuevoUsuario = await userService.registerUser(nombre, correo, contraseña);
    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const { token } = await userService.loginUser(correo, contraseña);
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario; 
    const usuario = await userService.getUserDetails(id_usuario);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const userData = req.body;
    const updatedUser = await userService.updateUserProfile(id_usuario, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    await userService.removeUser(id_usuario);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { correo } = req.body;
    const response = await userService.requestPasswordReset(correo);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, nuevaContraseña } = req.body;
    const response = await userService.resetPassword(token, nuevaContraseña);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { contraseñaActual, nuevaContraseña } = req.body;
    const response = await userService.changePassword(id_usuario, contraseñaActual, nuevaContraseña);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};