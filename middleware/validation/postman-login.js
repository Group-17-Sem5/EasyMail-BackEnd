const Joi = require('joi');

function validatePostMan(req,res,next){
  
    console.log("validating");
    const schema = Joi.object({
        'username'          : Joi.string().required().alphanum(),
        // 'job_post'               : Joi.string().required(),
        // 'contact_number'        : Joi.number().integer().required(),
        // 'email'                 : Joi.string().required().email(),
        'password'   : Joi.string().required().min(6)
    });

    return schema.validate(req.body);
}

exports.validatePostMan = validatePostMan;