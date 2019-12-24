const Joi = require("@hapi/joi");

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
       try {
        const obj= await schema.validateAsync(data);
        return obj;
    } catch (err) { 
       return err;
    }
};
const loginValidation = async (data) => {
    const schema = Joi.object({
         pwd: Joi.string(),
        email: Joi.string()
               .email(),
    });
    const value = await schema.validateAsync(data);
    return value;
};

module.exports =  {
     registerValidation : registerValidation,
     loginValidation : loginValidation
};