const Mongoose = require('mongoose');
const Hapi = require('hapi');
const routes = require('./routes/user');
const plugins = require('./plugins');
const CONFIG = require('./config');



const server = new Hapi.Server({ host: CONFIG.SERVER.host, port: CONFIG.SERVER.port });

let init = async () => {
    await server.register(plugins);
    // server.register(require('hapi-auth-jwt'), function (error) {

    //     server.auth.strategy('token', 'jwt', {
    //         key: privateKey,
    //         validateFunc: validate,
    //         verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
    //     });
    await Mongoose.connect(CONFIG.DB.dbUrl, { useNewUrlParser: true });
    console.log(`mongodb connected successfully`);
    await server.route(routes);
    await server.start();
    console.log(`server started at ${server.info.uri}`);
}
module.exports = init;
