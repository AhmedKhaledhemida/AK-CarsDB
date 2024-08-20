import Joi from "joi";

const carVal = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  model: Joi.string().required(),
  Horsepower: Joi.string().required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    size: Joi.number().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
  brand: Joi.string().required(),
  isSold: Joi.string(),
  soldTo: Joi.string(),
});

export { carVal };
