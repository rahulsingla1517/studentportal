const Mongoose = require('mongoose');
const Hapi = require('hapi');
const routes = require('./routes/user');
const plugins = require('./plugins');


const server = new Hapi.Server({ host: '0.0.0.0', port: 8000 });

let init = async () => {
    await server.register(plugins);
    await Mongoose.connect('mongodb://localhost:27017/studentPortal', { useNewUrlParser: true });
    console.log(`mongodb connected successfully`);
    await server.route(routes);
    await server.start();
    console.log(`server started at ${server.info.uri}`);
}
module.exports = init;
