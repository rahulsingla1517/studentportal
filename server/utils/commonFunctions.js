var nodemailer = require('nodemailer');
const CONFIG = require('../config');


let commonFunctions={};
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
        text:"hi"+emailData.name+",\nBelow are your login details with application number and password: \n\nAplication No.:"+emailData.appNo+"\nPassword:"+emailData.pass,

    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });  
}
module.exports = commonFunctions;
