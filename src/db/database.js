const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'root', 'pass',{
    dialect: 'sqlite',
    storage: __dirname + '/../../users.db',
    host: __dirname + '/../../users.db',
});

module.exports = sequelize;