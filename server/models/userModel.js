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
	fatherName: {
		type: String,
		required: true
    },
    motherName:{
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
     required: true
    },
    sign:{
        type: String,
        required: true
    },
    permanentAdd:{
        address:{
            type: String,
            required: true
        },
        
        city:{
            type:String,
        },
        pincode:{
            type: String,
            required:true
        },
        state:{
             type:String,
             required:true
        },
        country:{
            type:String,
             required:true
        }
    

    },
    tempAdd:{
        address:{
            type: String,
            required: true
        },
        
        city:{
            type:String,
        },
        pincode:{
            type: String,
            required:true
        },
        state:{
             type:String,
             required:true
        },
        country:{
            type:String,
             required:true
        }
        
    },
   

});
module.exports = Mongoose.model('user', studPortal);