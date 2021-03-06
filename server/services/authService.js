

const userModel = require('../models/userModel');


let authService = {};

authService.validateUser = async (decoded, request) => {
  try {

    let user = await userModel.findOne({ _id: decoded._id }).lean();

    if (!!user) {
      request.user = user;
      return { isValid: true }
    }
    return { isValid: false }
  } catch (error) {
    return { isValid: false }
  }
},





  module.exports = authService;