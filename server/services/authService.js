

const userModel = require('../models/userModel');
// let ObjectId = require('mongoose').Types.ObjectId;


let authService = {};

authService.validateUser = async (request, decoded) => {
  try {
      console.log(decoded);
      // decoded._id = ObjectId(decoded._id)

      let user = await userModel.findOne({ _id: decoded._id }).lean();
     
      if (!!user) {
      request.user = user;
      return {isValid: true}
    }
    return {isValid:false}
  } catch (error) {
    return {isValid:false}  }
},





module.exports = authService;