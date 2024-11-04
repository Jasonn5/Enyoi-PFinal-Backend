const { Category } = require('../models');

const getCategoriesByUserId = async (id_usuario) => {
  return await Category.findAll({ where: { id_usuario } });
};

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const getCategoryById = async (id_categoria) => {
  return await Category.findByPk(id_categoria);
};

const updateCategory = async (id_categoria, categoryData) => {
  const category = await Category.findByPk(id_categoria);
  if (category) {
    return await category.update(categoryData);
  }
  return null;
};

const deleteCategory = async (id_categoria) => {
  const category = await Category.findByPk(id_categoria);
  if (category) {
    return await category.destroy();
  }
  return null;
};

module.exports = {
  getCategoriesByUserId,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
