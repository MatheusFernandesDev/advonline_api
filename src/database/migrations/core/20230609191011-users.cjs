"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        id_user_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        photo_filename: {
          type: Sequelize.STRING,
        },
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject();
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable("users");

      return Promise.resolve();
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
  },
};
