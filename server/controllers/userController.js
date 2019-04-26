
const userService = require('../services/userService');
const imageNo = require('../models/imageno');
const appno = require('../models/appno');
const userModel = require('../models/userModel');
const fs = require('fs');
const CONFIG = require('../config');
const bcrypt = require('bcrypt');


let userController = {};

userController.userImage=async(request,h)=>{
return h.file(request.params.imagepath);
}
userController.signImage=async(request,h)=>{
  return h.file(request.params.signpath)

}

userController.fetchData= async(request,h)=>{
    let user = request.user;
    console.log(user);


    // funcion to validate token 
    
    
    // var header=request.header;

     //if validate then rest code 
    // let user = await userService.checkUser(payload.appNo);
    // let header=request.headers;
    // console.log(header.token);

    //if validate then rest code 
    // let user = await userService.checkUser(header.token)
    delete user.appNo;
    delete user.password;
    delete user._id;
    delete user.__v;
    return { statusCode: 200, message: "authorised user",user };
    
}
userController.login = async (request, h) => {
    let payload = request.payload;
    console.log(payload);
    let user = await userService.checkUser(payload.appNo);
    if (!user) {
        return { statusCode: 404, message: "User not found" };
    }
    console.log("user found & password to be checked...");
    let password = payload.password;
    let hash = user.password;
    console.log(password + hash)

    let passMatch = await bcrypt.compareSync(password, hash);
    console.log(passMatch);
    if (!passMatch) {
        return { statusCode: 401, message: " password Entered is not correct" }
    }
    try{
    var token = await userService.generateToken(user._id);
    console.log(token);   
    }
    catch(err){
     console.log(err)}
     return {token:token};


    //function to generate jwt  


   // return (jwt); response send will be JWT

}

userController.register = async (request, h) => {
    console.log("usercontroller reached");
    let payload = request.payload;

    // TO CHECK IF ATLEAST ONE USER IS PRESENT IN DB

    // TO CHECK IF EMAIL IS NOT ALREADY USED 
    let email = await userService.checkEmail(payload.email);
    console.log("emailchecked");
    if (email) {
        console.log("email already in use");
        return { statusCode: 409, message: "email already registered" };
    }
    console.log("email not in use");

    // TO CHECK IF APP NO. IS PRESENT IN APP COLLECTION
    let firstAppNo = await userService.getFirstAppNo();
   
    if (!firstAppNo) {
        firstAppNo = await userService.enterFirstAppNo(CONFIG.SERVER.firstAppNo);
        console.log("app no. is");
        console.log(firstAppNo);
    }
    console.log("app no. is exist");
    console.log(firstAppNo);
    //  FUNCTION TO SAVE IMAGE AND SIGN INTO UPLOADS FOLDER

    console.log('uploadfile function reached');
    // console.log(payload);
    let imgName = payload.image.hapi.filename;
    let sgnName = payload.sign.hapi.filename;
    console.log(imgName + " " + sgnName);
    // if (payload.image && payload.sign) {
    // console.log("if reached");
    let lastImageNo=await userService.getLastImageNo();
    console.log(lastImageNo);
    if (!lastImageNo) {
        console.log(" imageno does not exist so entering first imageno ...")
        lastImageNo = await userService.enterFirstImageNo(CONFIG.SERVER.constant);
        console.log("first imageno. entered");
    }
    console.log(lastImageNo);
    let newImageNo = lastImageNo.imageNo + CONFIG.SERVER.constant;
    console.log(newImageNo);
    await userService.updateImageNo(lastImageNo,newImageNo);
    let imageName = newImageNo + imgName.substr(imgName.lastIndexOf('.'));
    let signName = newImageNo + sgnName.substr(sgnName.lastIndexOf('.'));
    console.log("name of the file " + "" + imageName + "" + signName);
    let imagePath = __dirname + "/imageUploads/" + imageName;
    let signPath = __dirname + "/signUploads/" + signName;
    console.log(imagePath + signName);
    let imageFile = fs.createWriteStream(imagePath);
    let signFile = fs.createWriteStream(signPath);

    imageFile.on('error', (err) => console.error(err));
    signFile.on('error', (err) => console.error(err));
    payload.image.pipe(imageFile);
    payload.sign.pipe(signFile);

    imageFile.on('end', (err) => {
        let ret = {
            filename: payload.image.hapi.filename,
            headers: payload.image.hapi.headers
        }
        return JSON.stringify(ret);

    }
    );
    signFile.on('end', (err) => {
        const ret = {
            filename: payload.sign.hapi.filename,
            headers: payload.sign.hapi.headers
        }
        return JSON.stringify(ret);

    }
    )




    console.log(firstAppNo);

    // DATA SEND TO BE SAVED INTO DATABASE
    let response = await userService.saveData(payload, firstAppNo, imagePath, signPath);
    return response;

}
module.exports = userController;
