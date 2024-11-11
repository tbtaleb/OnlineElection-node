const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Favourite = sequelize.define('Favourite', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  candidateId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Favourite;
