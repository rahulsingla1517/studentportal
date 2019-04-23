var nodemailer = require('nodemailer');
const userModel = require('../models/userModel')
const appno = require('../models/appno')
const imageno = require('../models/imageno')
const bcrypt = require('bcrypt');



// const bcrypt = require('bcrypt');
const userService = {};

/*
function to find if email exists or not
@params = email
return email existence 
*/
userService.checkEmail=async (email)=>{
    try{
        let emailExit = await userModel.findOne({email:email});
        console.log(emailExit);
        return emailExit ;
    }
    catch(err){
        console.log("email exists")
    }
}
userService.enterFirstUser=async()=>{
    userDataToSave={
        appNo:100000, 
        name: "string",
  fName: "string",
  mName: "string",
  dob: Date.now(),
  gender: "string",
  password: "abc123",
  photo: "string",
  sign: "string",
  pincode: 34153,
  city: "string",
  phone: 0,
  state: "string",
  permanentAdd: "string",
  tempAdd: "string",
  email: "string"
    }
    let newUser = new userModel(userDataToSave);
    console.log("user about to save ");
    console.log(newUser);
    try{
  let user = await newUser.save();}
  catch(err){
      console.log(err);
  }
  console.log("user added");

}
userService.enterFirstAppNo = async(num)=>{
    let userDataToSave ={
        lastNo:num,
    };
    
  let newUser = new appno(userDataToSave);
  let user = await newUser.save();
  console.log("first appno."+ user);
}
userService.saveData=async(payload,lastNo)=>{
    
    // function getRandomArbitrary(, max) {
    //     return Math.random() * (max - min) + min;
    //   }

    // let lastNo =await appno.findOne({});
    let newNo= lastNo.lastNo +1;
    console.log(newNo);
    await appno.findOneAndUpdate({lastNo:lastNo.lastNo},{lastNo:newNo});


    var text = "";
    var length = 6;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log("pass"+text);




    let userDataToSave = {
        appNo:newNo,
        name:payload.name,
        fName:payload.fName,
        mName:payload.mName,
        dob:payload.dob,
        gender:payload.gender,
        email:payload.email,
        password:bcrypt.hashSync(text, 10),
        photo:payload.photo,
        sign:payload.sign,
        permanentAdd:payload.permanentAdd,
        tempAdd:payload.tempAdd,
        phone:payload.phone,
        city:payload.city,
        pincode:payload.pincode,
        state:payload.state,
        country:payload.country,
    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'rahulsingla1517@gmail.com',
               pass: 'Abhi@12345'
           }
       });
       const mailOptions = {
        from: 'rahulsingla1517@gmail.com', // sender address
        to: payload.email, // list of receivers
        subject: 'your application and password is:-', // Subject line
        // html: `<p><strong>Password:</strong></p>`// plain text body
        text:"Application No. :"+newNo+"   "+"Password :"+text
        
      };
console.log(mailOptions);
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});



  let newUser = new userModel(userDataToSave);
  try{
  let user = await newUser.save();
  }catch(err){
      console.log(err);
      console.log("ok");
      console.log("okoko")}
      
return{ statusCode:200 , message:"user registered" , userDetails:newUser}


}
module.exports = userService;