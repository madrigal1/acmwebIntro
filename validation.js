const Joi = require("@hapi/joi");
const boom = require("boom");

const registerValidation = async (data) => {
       const schema = Joi.object({
           name :  Joi.string()
                   .min(3)
                   .max(30)
                   .required(),
            pwd: Joi.string(),
           email: Joi.string().email(),
           date: Joi.date(),
       });
        const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
        return value;
};
const loginValidation = async (data) => {
    const schema = Joi.object({
         pwd: Joi.string(),
        email: Joi.string()
               .email(),
    });
    return schema.validateAsync(data);
};

module.exports =  {
     registerValidation : registerValidation,
     loginValidation : loginValidation
};