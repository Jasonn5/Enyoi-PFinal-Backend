const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Endpoints para la gestión de categorías
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías del usuario autenticado
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria:
 *                     type: integer
 *                   nombre_categoria:
 *                     type: string
 *                   id_usuario:
 *                     type: integer
 *       500:
 *         description: Error al obtener las categorías
 */
router.get('/', authMiddleware, categoryController.getCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_categoria:
 *                   type: integer
 *                 nombre_categoria:
 *                   type: string
 *                 id_usuario:
 *                   type: integer
 *       400:
 *         description: Error al crear la categoría
 */
router.post('/', authMiddleware, categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id_categoria}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id_categoria', authMiddleware, categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id_categoria}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a eliminar
 *     responses:
 *       204:
 *         description: Categoría eliminada con éxito
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id_categoria', authMiddleware, categoryController.deleteCategory);

module.exports = router;
