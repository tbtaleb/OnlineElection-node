const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vote = sequelize.define('Vote', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  candidateId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Vote;
