const pgp = require('pg-promise')();

const db = pgp({
  user: 'apires',
  password: 'api-res',
  database: 'restaurante',
  host: 'localhost', // ou o endereço do seu banco de dados
  port: 5432, // ou a porta do seu banco de dados
});

module.exports = db;

