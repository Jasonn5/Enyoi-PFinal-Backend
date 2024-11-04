const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const tasks = await taskService.getTasksForUser(id_usuario);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_vencimiento, prioridad, estado } = req.body;
    const id_usuario = req.user.id_usuario;
    const newTask = await taskService.addTask(titulo, descripcion, fecha_vencimiento, prioridad, estado, id_usuario);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id_tarea } = req.params;
    const taskData = req.body;
    const updatedTask = await taskService.modifyTask(id_tarea, taskData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id_tarea } = req.params;
    await taskService.removeTask(id_tarea);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.assignCategory = async (req, res) => {
  try {
    const { id_tarea, id_categoria } = req.body;
    const result = await taskService.linkCategoryToTask(id_tarea, id_categoria);
    res.status(201).json({ message: 'Categoría asignada a la tarea con éxito', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { id_tarea, id_categoria } = req.body;
    await taskService.unlinkCategoryFromTask(id_tarea, id_categoria);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
