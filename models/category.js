const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 

const Category = sequelize.define('Category', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_categoria: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_usuario',
    },
  },
}, {
  tableName: 'categorias',
  timestamps: false,
});

module.exports = Category;
