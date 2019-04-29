const nodemailer = require('nodemailer');
const CONFIG = require('../config');


let commonFunctions={};
commonFunctions.sendSuccess=async(user)=>{
   let  response={ statusCode: 200, message: "authorised user",user };
  return response;

};
commonFunctions.sendUserNotFound=async()=>{
   let  response= { statusCode: 404, message: "User not found" };
   return response;
 
 };
 commonFunctions.sendPassWrong =async()=> {
    return { statusCode: 401, message: " password Entered is not correct" };
 };

commonFunctions.sendUserAlreadyRegistered=async()=>{
    console.log("user already");
    let response= { statusCode: 409, message: "email already registered" };
    return response;
};
commonFunctions.sendUserImageExtsNotAllowed=async()=>{
    return { statusCode: 404, message: "this image extension not alowed" };
};
commonFunctions.sendUserPhotoExtsNotAllowed=async()=>{
    return { statusCode: 404, message: "this sign extension not alowed" };
};
commonFunctions.sendSuccessSave=async(user)=>{
   return  { statusCode: 200, message: `User registered successfully and its User number and password is send to ${user}` }

};

commonFunctions.sendEmail=(emailData)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CONFIG.SERVER.nodeMailer.email,
            pass: CONFIG.SERVER.nodeMailer.password
        }
    });
    const mailOptions = {
        from: CONFIG.SERVER.nodeMailer.email, // sender address
        to: emailData.email, // list of receivers
        subject: 'Login Details', // Subject line
        text:"hi  "+emailData.name+",\nBelow are your login details with application number and password: \n\nAplication No.:"+emailData.appNo+"\nPassword:"+emailData.pass,

    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });  
};
module.exports = commonFunctions;
