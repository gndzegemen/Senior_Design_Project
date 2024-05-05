
import Joi from 'joi';

const loginFormCheck = Joi.object({
    username: Joi.string()
        .required(),

    password: Joi.string()
        .required()
        .min(6)
        .pattern(new RegExp('(?=.*[A-Z])'))
        .messages({
            'string.min': `Password should have a minimum length of 6`,
            'string.pattern.base': `Password should have at least one upper case letter`,
        }),
});

const registerFormCheck = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': `Username cannot be empty`,
            'string.min': `Username should have a minimum length of {#limit}`,
            'string.max': `Username should have a maximum length of {#limit}`,
            'any.required': `Username is required`,
        }),

    password: Joi.string()
        .required()
        .min(6)
        .pattern(new RegExp('(?=.*[A-Z])'))
        .messages({
            'string.empty': `Password cannot be empty`,
            'string.min': `Password should have a minimum length of {#limit}`,
            'string.pattern.base': `Password should have at least one upper case letter`,
            'any.required': `Password is required`,
        }),

    email: Joi.string()
        .required()
        .pattern(new RegExp('.+@(gmail\.com|outlook\.com|vaband\.com)$'))
        .messages({
            'string.empty': `Email cannot be empty`,
            'string.pattern.base': `You entered invalid email. Email must end with gmail.com or outlook.com`,
            'any.required': `Email is required`,
        }),
});


export { loginFormCheck, registerFormCheck }