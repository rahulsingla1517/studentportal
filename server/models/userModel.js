const Mongoose = require('mongoose');

let studPortal = new Mongoose.Schema({
    appNo:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
	},
	fName: {
		type: String,
		required: true
    },
    mName:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        // required: true
    },
    sign:{
        type: String,
        // required: true
    },
    permanentAdd:{
        type: String,
        required: true
    },
    tempAdd:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true
    },


});
module.exports = Mongoose.model('user', studPortal);