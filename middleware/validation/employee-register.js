const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    branchID: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    addressID: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    phoneNumber: Joi.string()
        .integer()
        .min(0000000000)
        .max(9999999999)
        .required(),


    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],

    // birth_year: Joi.number()
    //     .integer()
    //     .min(1900)
    //     .max(2013),

    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'branchID')
    .xor('addressID', 'phoneNUmber')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', addressID: address123 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', addressID: address123 });
}
catch (err) { }