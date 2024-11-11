const { DataTypes, INTEGER } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  nom: { type: DataTypes.STRING, allowNull: false},
  prenom: { type: DataTypes.STRING, allowNull: false},
  password: { type: DataTypes.STRING, allowNull: false },
  dateDeNaissance: { type: DataTypes.DATEONLY, allowNull: false },
  adresse: { type: DataTypes.STRING, allowNull: false },
  telephone: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  cin: { type: DataTypes.INTEGER, allowNull: false, unique: true},
});

module.exports = User;
