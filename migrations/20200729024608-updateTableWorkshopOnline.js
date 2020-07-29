"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("workshopOnlines", "durationVideo", {
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("workshopOnlines", "durationVideo", {
      type: Sequelize.STRING,
    });
  },
};
