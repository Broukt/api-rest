const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../users.db',
    logging: false
});

module.exports = sequelize;