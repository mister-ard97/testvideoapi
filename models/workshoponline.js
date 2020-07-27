"use strict";
module.exports = (sequelize, DataTypes) => {
  const workshopOnline = sequelize.define(
    "workshopOnline",
    {
      program_name: DataTypes.STRING,
      thumbnail_video: DataTypes.STRING,
      slug: DataTypes.STRING,
      module_name: DataTypes.STRING,
      session_name: DataTypes.STRING,
      topic_name: DataTypes.STRING,
      video_description: DataTypes.STRING,
      isDeleted: DataTypes.INTEGER,
      videoSproutId: DataTypes.STRING,
      securityTokenSprout: DataTypes.STRING,
      durationVideo: DataTypes.STRING,
    },
    {}
  );
  workshopOnline.associate = function (models) {
    // associations can be defined here
  };
  return workshopOnline;
};
