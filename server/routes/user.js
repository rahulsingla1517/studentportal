let Joi =require('joi');
const userController = require('../controllers/userController')
const userRoutes =[{
    method:'POST',
    path:'/user',
    handler: userController.register,
    options:
    {
        tags:['api'],
        validate:{
            payload:{
                name: Joi.string().required(),
                fName:Joi.string().required(),
                mName:Joi.string().required(),
                dob:Joi.date().required(),
                gender:Joi.string().required(),
                // password:Joi.string().required(),
                photo:Joi.string().required(),
                sign:Joi.string().required(),
                pincode:Joi.number().required(),
                city:Joi.string().required(),
                phone:Joi.number().required(),
                state:Joi.string().required(),
                permanentAdd:Joi.string().required(),
                tempAdd:Joi.string().required(),
                email:Joi.string().required(),

            }
        }
    }
}]
module.exports=userRoutes;