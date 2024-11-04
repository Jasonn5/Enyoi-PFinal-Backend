const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  foto_perfil: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = User;
