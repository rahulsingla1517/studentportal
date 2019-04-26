
const userModel = require('../models/userModel')
const appno = require('../models/appno')
const imageno = require('../models/imageno')
const bcrypt = require('bcrypt');
const commonFunctions = require('../utils/commonFunctions');
const CONFIG = require('../config');
const jwt = require('jsonwebtoken');

const userService = {};

/*
function to find if email exists or not
@params = email
return email existence 
*/
userService.checkEmail = async (email) => {
    try {
        let emailExist = await userModel.findOne({ email: email });
        console.log(emailExist);
        return emailExist;
    }
    catch (err) {
        console.log(err)
    }
}
userService.checkUser = async (userNo) => {
    try {
        console.log("checkuser reached" + userNo);
        let userExist = await userModel.findOne({ appNo: userNo }).lean();
        console.log(userExist);
        return userExist;
    }
    catch (err) {
        console.log(err)
    }
}
userService.generateToken = async (id) => {
    var token = jwt.sign({_id:id }, CONFIG.SERVER.privateKey, { algorithm: 'HS256' });
    console.log(token);
    return token;
}
userService.getFirstAppNo=async()=>{
    let firstAppNo = await appno.findOne({});
    return firstAppNo;
}
userService.getLastImageNo = async()=>{
    let lastImageNo = await imageNo.findOne({});
       return lastImageNo;
}
userService.updateLastImageNo=async(lastImageNo,newImageNo)=>{
    await imageNo.findOneAndUpdate({ imageNo: lastImageNo.imageNo }, { imageNo: newImageNo });

}

userService.enterFirstAppNo = async (num) => {
    let userDataToSave = {
        lastNo: num,
    };

    let newUser = new appno(userDataToSave);
    let user = await newUser.save();
    console.log("first appno. in userservice" + user);
    return user;
}
userService.enterFirstImageNo = async (num) => {
    imageNoToSave = {
        imageNo: num
    }
    let newImageNO = new imageno(imageNoToSave)
    return await newImageNO.save();
    console.log(" frist image no. is " + " " + imageNum);
},
    userService.saveData = async (payload, lastNo, imagePath, signPath) => {

        // function getRandomArbitrary(, max) {
        //     return Math.random() * (max - min) + min;
        //   }

        // let lastNo =await appno.findOne({});
        let newNo = lastNo.lastNo + CONFIG.SERVER.constant;
        console.log(newNo);
        await appno.findOneAndUpdate({ lastNo: lastNo.lastNo }, { lastNo: newNo });



        var text = "";
        var length = CONFIG.SERVER.passLength;
        var possible = CONFIG.SERVER.possible;
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        console.log("pass" + text);



        let userDataToSave = {
            appNo: newNo,
            name: payload.name,
            fatherName: payload.fatherName,
            motherName: payload.motherName,
            dob: payload.dob,
            gender: payload.gender,
            email: payload.email,
            password: bcrypt.hashSync(text, CONFIG.SERVER.salt),
            photo: imagePath,
            sign: signPath,
            permanentAdd: {
                address: payload.permanentAdd.address,
                city: payload.permanentAdd.city,
                pincode: payload.permanentAdd.pincode,
                state: payload.permanentAdd.state,
                country: payload.permanentAdd.country
            },
            tempAdd: {
                address: payload.tempAdd.address,
                city: payload.tempAdd.city,
                pincode: payload.tempAdd.pincode,
                state: payload.tempAdd.state,
                country: payload.tempAdd.country
            },



        }
        let emailData = {
            email: payload.email,
            pass: text,
            appNo: newNo,
            name: payload.name
        }


        let newUser = new userModel(userDataToSave);
        try {
            await newUser.save();
        } catch (err) {
            console.log(err);
        }
        console.log("successful");
        commonFunctions.sendEmail(emailData);
        return { statusCode: 200, message: `User registered successfully and its User number and password is send to ${payload.email}`, userDetails: newUser }


    }
module.exports = userService;