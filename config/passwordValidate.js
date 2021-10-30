const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{9,30}$')),

    conPassword: Joi.ref('password'),
})
    
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -



const validatePassword = async (password,conPassword) => {
    const value = await schema.validateAsync({ password, conPassword });
    return value
}

module.exports = validatePassword