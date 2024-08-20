import { AppError } from "../utils/AppError.js";

export const validations = (schema) => {
  return (req, res, next) => {
    let dataForValidation = {
      ...req.body,
      ...req.params,
      
    };

    if (req.file) {
      if (req.file.fieldname === "image") {
        dataForValidation.image = req.file;
      }
    }
      let { error } = schema.validate(dataForValidation, { abortEarly: false });

      if (error) {
        let errMsgs = error.details.map((err) => err.message);
        next(new AppError(errMsgs,401))
      } else {
        next();
        
      }
    }
  };

