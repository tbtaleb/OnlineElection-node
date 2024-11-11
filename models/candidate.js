const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Candidate = sequelize.define('Candidate', {
  name: { type: DataTypes.STRING, allowNull: false },
  biography: DataTypes.TEXT,
  party: DataTypes.STRING,
  program: DataTypes.TEXT,
});

module.exports = Candidate;
