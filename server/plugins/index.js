const CONFIG = require('../config');
const authService=require('../services/authService');



let plugins = [
    require('inert'),
    require('vision'),
    require('hapi-auth-jwt2'),

    {
        plugin: require('hapi-swagger'),
        options: {
            info: {
                title: ' API Documentation',
                version: '1.0.0'
            }
        }
    },
    {
        name:'authentication', 
        register: async(server,options)=>{
          server.auth.strategy(CONFIG.SERVER.auth,'jwt', {
            key: CONFIG.SERVER.privateKey,
            validate: authService.validateUser,
            verifyOptions: { algorithms: ['HS256'] }
          });
         
        }
      },
];

module.exports = plugins;
