let Joi = require('joi');
const userController = require('../controllers/userController')
const CONFIG=require('../config');
const userRoutes = [{
    method: 'POST',
    path: '/user',
    handler: userController.register,
    options:
    {
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: [
                    { 'code': 500, 'message': 'Internal Server Error' }
                ]
            }
        },
        validate: {
            payload: {
                image: Joi.any().meta({ swaggerType: 'file' }).description('upload user image  any of these types:-   .jpg/.jpeg/.png  ,  size:- max=400kb').required(),
                sign: Joi.any().meta({ swaggerType: 'file' }).description('upload signature image  any of these types:- .jpg/.jpeg/.png,size:- max=400kb  ').required(),
                name: Joi.string().required().description('user name'),
                fatherName: Joi.string().required().description('user father name'),
                motherName: Joi.string().required().description('user mother name'),
                dob: Joi.date().required().description('user Date of birth, format:  yyyy-mm-dd'),
                gender: Joi.string().required().description('user  gender'),
                permanentAdd: Joi.object({ address: Joi.string().required(), country: Joi.string().required(), city: Joi.string(), state: Joi.string().required(), pincode: Joi.string().required() }).description(` 
                {
                    "address" : "#13988",
                    "city" : "bathinda",
                    "pincode" : "123443",
                    "state" : "punjab",
                    "country" : "inida"
                }
                `),
                tempAdd: Joi.object({ address: Joi.string().required(), country: Joi.string().required(), city: Joi.string(), state: Joi.string().required(), pincode: Joi.string().required() }).description(`
                {
                    "address" : "#13988",
                    "city" : "bathinda",
                    "pincode" : "123443",
                    "state" : "punjab",
                    "country" : "inida"
                }
                `),
                email: Joi.string().email().required().description('user email  ,format:-   abc@xyz'),

            }
        },
        payload: {

            maxBytes: 1000 * 400, 
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
},
{
    method: 'POST',
    path: '/user/login',
    handler: userController.login,
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            payload: {
                appNo: Joi.number().required().description('application number of user '),
                password: Joi.string().required().description('password of user')

            }
        }


    }
}
    ,
{
    method: 'GET',
    path: '/user/auth',
    handler: userController.fetchData,

    options: {
        tags: ['api'],
        auth: CONFIG.SERVER.auth,
        validate: {
            headers: Joi.object({
              authorization: Joi.string().required().description('enter tokken for authorization')
            }).unknown()
        },
        
       

    }
},
{
    method: 'GET',
    path: '/user/userimage/{imagepath}',
    handler: userController.userImage,
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            params: {
                imagepath: Joi.string().description('enter the user image path')
            }
        }

    }
},
{
    method: 'GET',
    path: '/user/signimage/{signpath}',
    handler: userController.signImage,
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            params: {
                signpath: Joi.string().description('enter user signature path')
            }
        }

    },
    handler: userController.signImage,
}]
module.exports = userRoutes;