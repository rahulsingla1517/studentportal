let Joi = require('joi');
const userController = require('../controllers/userController')
const userRoutes = [{
    method: 'POST',
    path: '/user',
    handler: userController.register,
    options:
    {  
        //  auth: 'token',
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
                image: Joi.any().meta({ swaggerType: 'file' }).description('file').required(),
                sign: Joi.any().meta({ swaggerType: 'file' }).description('file').required(),
                name: Joi.string().required(),
                fatherName: Joi.string().required(),
                motherName: Joi.string().required(),
                dob: Joi.date().required(),
                gender: Joi.string().required(),
                permanentAdd: Joi.object({ address: Joi.string().required(), country: Joi.string().required(), city: Joi.string(), state: Joi.string().required(), pincode: Joi.string().required() }),
                tempAdd: Joi.object({ address: Joi.string().required(), country: Joi.string().required(), city: Joi.string(), state: Joi.string().required(), pincode: Joi.string().required() }),
                email: Joi.string().required(),

            }
        },
        payload: {


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
                appNo: Joi.number().required(),
                password: Joi.string().required()

            }
        }


    }
}
,
{
    method: 'GET',
    path: '/user/login',
    options: {
        tags: ['api'],
        auth: 'userAuth',
        validate: {
            headers: Joi.object({
              authorization: Joi.string().required()
            }),
        },
        
       


    },
    handler: userController.fetchData,
}]
module.exports = userRoutes;