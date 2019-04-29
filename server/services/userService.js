
const userModel = require('../models/userModel')
const appno = require('../models/appno')
const imageNo = require('../models/imageno')
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
        return emailExist;
    }
    catch (err) {
        return err;
    }
}
userService.checkUser = async (userNo) => {
    try {
        let userExist = await userModel.findOne({ appNo: userNo }).lean();
        return userExist;
    }
    catch (err) {
        return err;
    }
}
userService.generateToken = async (id) => {
    var token = jwt.sign({_id:id }, CONFIG.SERVER.privateKey, { algorithm: 'HS256' });
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
    return user;
}
userService.enterFirstImageNo = async (num) => {
    imageNoToSave = {
        imageNo: num
    }
    let newImageNo = new imageNo(imageNoToSave)
    return await newImageNo.save();
},
    userService.saveData = async (payload, lastNo, imagePath, signPath) => {

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
        commonFunctions.sendEmail(emailData); 
        return payload.email ;
   }
module.exports = userService;