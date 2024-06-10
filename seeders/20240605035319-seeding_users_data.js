'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password1 = 'Inferno666'; 
    const password2 = 'nobody24'; 
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const hashedPassword1 = await bcrypt.hash(password1, saltRounds);
    const hashedPassword2 = await bcrypt.hash(password2, saltRounds);
    await queryInterface.bulkInsert('Users', [
      {
        username: 'DanteLCB',
        email: 'dante@limbus.com',
        password: hashedPassword1,
        phoneNumber: '08184763646433',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'OutisLCB',
        email: 'outis@limbus.com',
        password: hashedPassword2,
        phoneNumber: '087234367282',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
