const categoryDataAccess = require('../data_access/categoryDataAccess');

const getCategoriesForUser = async (id_usuario) => {
  return await categoryDataAccess.getCategoriesByUserId(id_usuario);
};

const addCategory = async (nombre_categoria, id_usuario) => {
  return await categoryDataAccess.createCategory({ nombre_categoria, id_usuario });
};

const modifyCategory = async (id_categoria, nombre_categoria) => {
  const updatedCategory = await categoryDataAccess.updateCategory(id_categoria, { nombre_categoria });
  if (!updatedCategory) {
    throw new Error('Categoría no encontrada');
  }
  return updatedCategory;
};

const removeCategory = async (id_categoria) => {
  const deletedCategory = await categoryDataAccess.deleteCategory(id_categoria);
  if (!deletedCategory) {
    throw new Error('Categoría no encontrada');
  }
  return deletedCategory;
};

module.exports = {
  getCategoriesForUser,
  addCategory,
  modifyCategory,
  removeCategory,
};
