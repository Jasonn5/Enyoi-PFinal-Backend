const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');
const Category = require('./category');
const TareasCategorias = require('./task_categories');

User.hasMany(Task, { foreignKey: 'id_usuario' });
Task.belongsTo(User, { foreignKey: 'id_usuario' });

User.hasMany(Category, { foreignKey: 'id_usuario' });
Category.belongsTo(User, { foreignKey: 'id_usuario' });

Task.belongsToMany(Category, { through: TareasCategorias, foreignKey: 'id_tarea' });
Category.belongsToMany(Task, { through: TareasCategorias, foreignKey: 'id_categoria' });

module.exports = {
  sequelize,
  User,
  Task,
  Category,
  TareasCategorias,
};
