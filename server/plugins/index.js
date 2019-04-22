let plugins = [
    require('inert'),
    require('vision'),
    {
        plugin: require('hapi-swagger'),
        options: {
            info: {
                title: ' API Documentation',
                version: '1.0.0'
            }
        }
    }
];

module.exports = plugins;
