const Mongoose = require('mongoose');
const Hapi = require('hapi');
const routes = require('./routes/user');
const plugins = require('./plugins');
const CONFIG = require('./config');



const server = new Hapi.Server({ host: CONFIG.SERVER.host, port: CONFIG.SERVER.port });

let init = async () => {
    await server.register(plugins);
    await Mongoose.connect(CONFIG.DB.dbUrl, { useNewUrlParser: true });
    console.log(`mongodb connected successfully`);
    await server.route(routes);
    await server.start();
    console.log(`server started at ${server.info.uri}`);
}
module.exports = init;
