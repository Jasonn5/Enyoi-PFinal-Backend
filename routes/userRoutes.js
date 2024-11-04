const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: Identificador único del usuario
 *         nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *         correo:
 *           type: string
 *           description: Correo electrónico único del usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña cifrada
 *         foto_perfil:
 *           type: string
 *           description: URL de la foto de perfil
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la cuenta
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización
 *       required:
 *         - nombre
 *         - correo
 *         - contraseña
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *             required:
 *               - nombre
 *               - correo
 *               - contraseña
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *             required:
 *               - correo
 *               - contraseña
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener el perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/profile', authMiddleware, userController.getUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Actualizar el perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al actualizar el perfil
 */
router.put('/profile', authMiddleware, userController.updateUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   delete:
 *     summary: Eliminar el perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/profile', authMiddleware, userController.deleteUser);

/**
 * @swagger
 * /api/users/request-password-reset:
 *   post:
 *     summary: Solicitar un restablecimiento de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico asociado a la cuenta
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en la solicitud de restablecimiento de contraseña
 */
router.post('/request-password-reset', userController.requestPasswordReset);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Restablecer la contraseña usando un token
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de restablecimiento de contraseña
 *               nuevaContraseña:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña restablecida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error al restablecer la contraseña (token inválido o expirado)
 */
router.post('/reset-password', userController.resetPassword);

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Cambiar la contraseña del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contraseñaActual:
 *                 type: string
 *                 description: Contraseña actual del usuario
 *               nuevaContraseña:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en la solicitud de cambio de contraseña (contraseña actual incorrecta)
 */
router.put('/change-password', authMiddleware, userController.changePassword);

module.exports = router;