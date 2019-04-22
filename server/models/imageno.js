const Mongoose = require('mongoose');


let lastImageNo= new Mongoose.Schema({
    lastImageNo:{
        type: Number,
        // required: true
    }

});

module.exports = Mongoose.model('lastImageNo', lastImageNo);