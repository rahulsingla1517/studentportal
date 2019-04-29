'use strict';

const SERVER_CONFIG = {
  host:'0.0.0.0',
  port: 8000,
  nodeMailer:{
      email:'rahulsingla1517@gmail.com',
      password:'Abhi@12345',
  },
  constant:1,
  passLength:6,
  firstAppNo:100000,
  privateKey:'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc',
  auth:'userAuth',
  possible:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  salt:10
};

module.exports = SERVER_CONFIG;