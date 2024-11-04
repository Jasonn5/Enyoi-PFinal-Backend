const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para la gestión de tareas
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tarea:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   fecha_vencimiento:
 *                     type: string
 *                     format: date-time
 *                   prioridad:
 *                     type: string
 *                     enum: [baja, media, alta]
 *                   estado:
 *                     type: string
 *                     enum: [pendiente, en progreso, completada]
 *                   id_usuario:
 *                     type: integer
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_categoria:
 *                           type: integer
 *                         nombre_categoria:
 *                           type: string
 *       500:
 *         description: Error al obtener las tareas
 */
router.get('/', authMiddleware, taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date-time
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en progreso, completada]
 *     responses:
 *       201:
 *         description: Tarea creada con éxito
 *       400:
 *         description: Error al crear la tarea
 */
router.post('/', authMiddleware, taskController.createTask);

/**
 * @swagger
 * /api/tasks/{id_tarea}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date-time
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en progreso, completada]
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/:id_tarea', authMiddleware, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id_tarea}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *     responses:
 *       204:
 *         description: Tarea eliminada con éxito
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id_tarea', authMiddleware, taskController.deleteTask);

/**
 * @swagger
 * /api/tasks/assign-category:
 *   post:
 *     summary: Asignar una categoría a una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_tarea:
 *                 type: integer
 *               id_categoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Categoría asignada a la tarea con éxito
 *       500:
 *         description: Error al asignar la categoría
 */
router.post('/assign-category', authMiddleware, taskController.assignCategory);

/**
 * @swagger
 * /api/tasks/remove-category:
 *   post:
 *     summary: Desasignar una categoría de una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_tarea:
 *                 type: integer
 *               id_categoria:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Categoría desasignada con éxito
 *       404:
 *         description: Tarea o categoría no encontrada
 */
router.post('/remove-category', authMiddleware, taskController.removeCategory);

module.exports = router;
