const Mongoose = require('mongoose');


let imageNo = new Mongoose.Schema({
    imageNo: {
        type: Number,
        required: true
    }

});

module.exports = Mongoose.model('lastImageNo', imageNo);