import { User } from "../../DataBase/Models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/catchError.js";

export const checkAdmin = catchError(
  async (req, res, next) => {
    let user = await User.findOne({ _id: req.user._id, role: "admin" });
    if (!user) return next(new AppError("Your are not an admin" , 401)) 
  
    next();
  }
)
