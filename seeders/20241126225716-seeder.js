'use strict';
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Import User from the models directory

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
      const password = String(faker.internet.password(20));
      const hashedPassword = await bcrypt.hash(password, 10); // Await the hash result
      try {
        await User.create({
          uuid: uuidv4(),
          name: faker.person.firstName(),
          email: email,
          last_names: String(faker.person.lastName() + ' ' + faker.person.lastName()),
          password: hashedPassword, // Use the hashed password
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        i++;
      } catch (error) {
        console.error('Error creating user:', error);
        break;
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await User.destroy({
      where: {},
      truncate: true
    });
  }
};