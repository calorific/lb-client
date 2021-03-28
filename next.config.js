require("dotenv").config();

module.exports = {
  distDir: 'build',
  env: {
    API_URL: process.env.API_URL,
  },
};
