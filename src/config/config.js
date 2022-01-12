require('dotenv').config();

const x = {
  development: {
    username: "root",
    password: "root",
    database: "chaplin",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: "root",
    database: "chaplin",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "root",
    database: "chaplin",
    host: "localhost",
    dialect: "mysql",
  },
};
module.exports = x;
