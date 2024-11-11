const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your MySQL configuration
const sequelize = new Sequelize('projetNode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('MySQL database connected...');
  })
  .catch(err => {
    console.error('Error: ' + err);
  });

module.exports = sequelize;
