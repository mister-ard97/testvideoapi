module.exports = {
  apps: [
    {
      name: "TestVideo_API",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      time: true,
    },
  ],
};
