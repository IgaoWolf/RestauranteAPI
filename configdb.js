const pgp = require('pg-promise')();

const db = pgp({
  user: 'apires',
  password: 'api-res',
  database: 'restaurante',
  host: 'localhost',
  port: 5432,
});

module.exports = db;
