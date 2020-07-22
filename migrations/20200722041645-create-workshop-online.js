'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workshopOnlines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_name: {
        type: Sequelize.STRING
      },
      thumbnail_video: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      module_name: {
        type: Sequelize.STRING
      },
      session_name: {
        type: Sequelize.STRING
      },
      topic_name: {
        type: Sequelize.STRING
      },
      video_description: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.INTEGER
      },
      videoSproutId: {
        type: Sequelize.STRING
      },
      securityTokenSprout: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workshopOnlines');
  }
};