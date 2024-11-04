const { Task, Category, TareasCategorias } = require('../models');

const getTasksByUserId = async (id_usuario) => {
  return await Task.findAll({
    where: { id_usuario },
    include: Category, 
  });
};

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getTaskById = async (id_tarea) => {
  return await Task.findByPk(id_tarea, {
    include: Category, 
  });
};

const updateTask = async (id_tarea, taskData) => {
  const task = await Task.findByPk(id_tarea);
  if (task) {
    return await task.update(taskData);
  }
  return null;
};

const deleteTask = async (id_tarea) => {
  const task = await Task.findByPk(id_tarea);
  if (task) {
    return await task.destroy();
  }
  return null;
};

const assignCategoryToTask = async (id_tarea, id_categoria) => {
  return await TareasCategorias.create({ id_tarea, id_categoria });
};

const removeCategoryFromTask = async (id_tarea, id_categoria) => {
  return await TareasCategorias.destroy({
    where: { id_tarea, id_categoria },
  });
};

module.exports = {
  getTasksByUserId,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  assignCategoryToTask,
  removeCategoryFromTask,
};
