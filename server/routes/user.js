let Joi = require('joi');
const userController = require('../controllers/userController')
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
                image: Joi.any().meta({ swaggerType: 'file' }).description('file').required(),
                sign: Joi.any().meta({ swaggerType: 'file' }).description('file').required(),
                name: Joi.string().required(),
                fName: Joi.string().required(),
                mName: Joi.string().required(),
                dob: Joi.date().required(),
                gender: Joi.string().required(),
                pincode: Joi.number().required(),
                city: Joi.string().required(),
                phone: Joi.number().required(),
                state: Joi.string().required(),
                permanentAdd: Joi.string().required(),
                tempAdd: Joi.string().required(),
                email: Joi.string().required(),

            }
        },
        payload: {
          

            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
}]
module.exports = userRoutes;