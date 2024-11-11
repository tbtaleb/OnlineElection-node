const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  candidate_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  updatedAt: false, 
  timestamps: true, 
});

module.exports = Comment;