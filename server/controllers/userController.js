
const userService = require('../services/userService');

const fs = require('fs');
const CONFIG = require('../config');
const bcrypt = require('bcrypt');
const commonFunctions = require('../utils/commonFunctions')


let userController = {};

userController.userImage=async(request,h)=>{
return h.file(request.params.imagepath);
}
userController.signImage=async(request,h)=>{
  return h.file(request.params.signpath)

}

userController.fetchData= async(request,h)=>{
    let user = request.user;
    delete user.appNo;
    delete user.password;
    delete user._id;
    delete user.__v;
 return commonFunctions.sendSuccess(user) ;
}
userController.login = async (request, h) => {
    let payload = request.payload;
    let user = await userService.checkUser(payload.appNo);
    if (!user) {
      return await commonFunctions.sendUserNotFound() ;
    }
    let password = payload.password;
    let hash = user.password;

    let passMatch = await bcrypt.compareSync(password, hash);
    if (!passMatch) {
        return await commonFunctions.sendPassWrong() ;
   
    }
    var token = await userService.generateToken(user._id);
    return {token:token}
   

    //function to generate jwt  


   // return (jwt); response send will be JWT

}

userController.register = async (request, h) => {
    let payload = request.payload;
    console.log(payload);

    // TO CHECK IF ATLEAST ONE USER IS PRESENT IN DB

    // TO CHECK IF EMAIL IS NOT ALREADY USED 
    let email = await userService.checkEmail(payload.email);
    console.log(email);
    if (!!email) {
        console.log("user");
        let response =await commonFunctions.sendUserAlreadyRegistered();
         return response;
    }

    // TO CHECK IF APP NO. IS PRESENT IN APP COLLECTION
    let firstAppNo = await userService.getFirstAppNo();
   
    if (!firstAppNo) {
        firstAppNo = await userService.enterFirstAppNo(CONFIG.SERVER.firstAppNo);
    
    }
    //  FUNCTION TO SAVE IMAGE AND SIGN INTO UPLOADS FOLDER


    let imgName = payload.image.hapi.filename;
    let sgnName = payload.sign.hapi.filename;
    
    let lastImageNo=await userService.getLastImageNo();
    if (!lastImageNo) {
        lastImageNo = await userService.enterFirstImageNo(CONFIG.SERVER.constant);
    }
    let newImageNo = lastImageNo.imageNo + CONFIG.SERVER.constant;
    await userService.updateLastImageNo(lastImageNo,newImageNo);
    var allowedExts= ['.jpeg', '.jpg', '.png'];
    let imageExtsExit=allowedExts.includes(imgName.substr(imgName.lastIndexOf('.')));
    if(!imageExtsExit)
    {
        return await commonFunctions.sendUserImageExtsNotAllowed();
    }
    let photoExtsExit=allowedExts.includes(sgnName.substr(sgnName.lastIndexOf('.')));
    if(!photoExtsExit)
    {
        return await commonFunctions.sendUserPhotoExtsNotAllowed();
    }

    let imageName = newImageNo + imgName.substr(imgName.lastIndexOf('.'));
    let signName = newImageNo + sgnName.substr(sgnName.lastIndexOf('.'));
    let imagePath = __dirname + "/imageUploads/" + imageName;
    
    let signPath = __dirname + "/signUploads/" + signName;


    

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





    // DATA SEND TO BE SAVED INTO DATABASE
    let user = await userService.saveData(payload, firstAppNo, imagePath, signPath);
    return commonFunctions.sendSuccessSave(user); 
    

}


module.exports = userController ;
