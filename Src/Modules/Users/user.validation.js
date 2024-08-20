import Joi from "joi";

const signupVal = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^[a-z0-9A-Z]{5,16}$/),
  role: Joi.string(),
  phone:Joi.number().required()
});

const signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^[a-z0-9A-Z]{5,16}$/),
});

export { signupVal, signinVal };
