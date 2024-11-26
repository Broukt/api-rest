'use strict';
const { faker } = require('@faker-js/faker');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let i = 0;
    while (i < 100) {
      const email = faker.internet.email();
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        continue;
      }
      await User.create({
        uuid: uuidv4(),
        name: faker.person.firstName(),
        email: email,
        last_names: faker.person.lastName() + ' ' + faker.person.lastName(),
        password: bcrypt.hash(faker.internet.password(), 10),
        is_deleted: false
      });
      i++;
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
