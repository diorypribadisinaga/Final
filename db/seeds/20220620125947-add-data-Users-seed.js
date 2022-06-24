'use strict';

const bcrypt = require("bcrypt")
const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Users', [{
        nama: "Diory Pribadi Sinaga",
        email: "diory@gmail.com",
        password: encryptPassword("Bacot123"),
        kota: "Bandung",
        alamat: "Dimana Aja",
        nomor_hp: "08xxxxxx96",
        image: "http://res.cloudinary.com/dt3pzvmfg/image/upload/v1655901045/mrgynbedebvgxgtjiolv.jpg",
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        }], 
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete("User", null, {});
  }
};
