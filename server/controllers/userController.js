const userService = require('../services/userService');
const imageno = require('../models/imageno');
const appno = require('../models/appno');
const userModel = require('../models/userModel');

let userController = {};


userController.register = async(request,h) => {
    console.log("usercontroller reached");
    let payload = request.payload;
    let x= await userModel.findOne({});
    if(!x){
        console.log("ok");
        await userService.enterFirstUser();

    }

    let email = await userService.checkEmail(payload.email);
    console.log("emailchecked");
    if(email){
        console.log("email already in use");
        return{statusCode:409 , message:"email already registered"};
    }
    console.log("email not in use");

    let first= await appno.findOne({});
    if(!first){
        await userService.enterFirstAppNo(100000);
        console.log("first app no. is entered")
    }
    console.log("app no. is exist");
     let response = await userService.saveData(payload,first);
     return response;

}
module.exports = userController;
