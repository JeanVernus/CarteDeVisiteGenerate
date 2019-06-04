const mySql = require('mysql');

const config = mySql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'servall777',
  database: 'phpmyadmin'
});

module.exports = config;