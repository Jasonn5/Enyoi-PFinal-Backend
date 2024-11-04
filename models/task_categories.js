const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./task');
const Category = require('./category');

const TareasCategorias = sequelize.define('TareasCategorias', {
  id_tarea: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: 'id_tarea',
    },
    primaryKey: true,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id_categoria',
    },
    primaryKey: true,
  },
}, {
  tableName: 'tareas_categorias',
  timestamps: false,
});

Task.belongsToMany(Category, { through: TareasCategorias, foreignKey: 'id_tarea' });
Category.belongsToMany(Task, { through: TareasCategorias, foreignKey: 'id_categoria' });

module.exports = TareasCategorias;
