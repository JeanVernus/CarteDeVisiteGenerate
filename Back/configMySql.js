const mySql = require('mysql');

const config = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Serval7*',
  database: 'RevisiteTaCarte'
});

module.exports = config;