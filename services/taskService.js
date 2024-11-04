const taskDataAccess = require('../data_access/taskDataAccess');

const getTasksForUser = async (id_usuario) => {
  return await taskDataAccess.getTasksByUserId(id_usuario);
};

const addTask = async (titulo, descripcion, fecha_vencimiento, prioridad, estado, id_usuario) => {
  return await taskDataAccess.createTask({ titulo, descripcion, fecha_vencimiento, prioridad, estado, id_usuario });
};

const modifyTask = async (id_tarea, taskData) => {
  const updatedTask = await taskDataAccess.updateTask(id_tarea, taskData);
  if (!updatedTask) {
    throw new Error('Tarea no encontrada');
  }
  return updatedTask;
};

const removeTask = async (id_tarea) => {
  const deletedTask = await taskDataAccess.deleteTask(id_tarea);
  if (!deletedTask) {
    throw new Error('Tarea no encontrada');
  }
  return deletedTask;
};

const linkCategoryToTask = async (id_tarea, id_categoria) => {
  return await taskDataAccess.assignCategoryToTask(id_tarea, id_categoria);
};

const unlinkCategoryFromTask = async (id_tarea, id_categoria) => {
  return await taskDataAccess.removeCategoryFromTask(id_tarea, id_categoria);
};

module.exports = {
  getTasksForUser,
  addTask,
  modifyTask,
  removeTask,
  linkCategoryToTask,
  unlinkCategoryFromTask,
};
