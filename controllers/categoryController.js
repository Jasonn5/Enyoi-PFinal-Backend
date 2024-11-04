const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario; 
    const categories = await categoryService.getCategoriesForUser(id_usuario);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;
    const id_usuario = req.user.id_usuario;
    const newCategory = await categoryService.addCategory(nombre_categoria, id_usuario);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const { nombre_categoria } = req.body;
    const updatedCategory = await categoryService.modifyCategory(id_categoria, nombre_categoria);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    await categoryService.removeCategory(id_categoria);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
