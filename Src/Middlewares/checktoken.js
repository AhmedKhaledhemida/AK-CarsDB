import jwt from "jsonwebtoken";
import { User } from "../../DataBase/Models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/catchError.js";

export const checkToken = catchError(
  async (req, res, next) => {
    let { token } = req.headers;
    let userPayload = null;
    if (!token) return next(new AppError("Token not provided",401))
  
    jwt.verify(token, process.env.BASE_URL, (err, payload) => {
      if (err) return next(new AppError(err,401))
      userPayload = payload;
    });
  
    let user = await User.findById(userPayload.userId);
    if (!user) return next(new AppError("user not found" , 401))
    req.user = user;
    next();
  }
)
