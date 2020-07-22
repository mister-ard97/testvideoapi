'use strict';
module.exports = (sequelize, DataTypes) => {
  const allowuser = sequelize.define('allowuser', {
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    isComplete: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER
  }, {});
  allowuser.associate = function(models) {
    // associations can be defined here
  };
  return allowuser;
};