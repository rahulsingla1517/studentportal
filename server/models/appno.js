const Mongoose = require('mongoose');

let lastAppNo = new Mongoose.Schema({
    lastNo:{
        type: Number,
        required: true
    }
});
module.exports = Mongoose.model('lastAppNo',lastAppNo );