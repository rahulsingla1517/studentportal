'use strict';

const DB_CONFIG = {
  protocol: 'mongodb',
  host: 'localhost',
  port:  27017,
  dbName:  'studentPortal',
  dbUrl: ''
};

/** set connection string **/
DB_CONFIG.dbUrl = DB_CONFIG.protocol + '://' + DB_CONFIG.host + ':' + DB_CONFIG.port + '/' + DB_CONFIG.dbName;

module.exports = DB_CONFIG;
