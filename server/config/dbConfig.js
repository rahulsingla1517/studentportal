'use strict';

const DB_CONFIG = {
  protocol: 'mongodb',
  host: process.env.DB_HOST ||'localhost',
  port:  process.env.DB_PORT || 27017,
  dbName: process.env.DB_NAME ||  'studentPortal',
  dbUrl: ''
};

/** set connection string **/
DB_CONFIG.dbUrl = DB_CONFIG.protocol + '://' + DB_CONFIG.host + ':' + DB_CONFIG.port + '/' + DB_CONFIG.dbName;

module.exports = DB_CONFIG;
