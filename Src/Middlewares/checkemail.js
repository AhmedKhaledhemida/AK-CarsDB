import { User } from "../../DataBase/Models/user.model.js"
import { AppError } from "../utils/AppError.js"
import { catchError } from "../utils/catchError.js"
 

export const checkemail =catchError(
    async(req,res,next)=>{
        let isfound=await User.findOne({email:req.body.email})
        if (isfound)
        return next(new AppError("Email is already exist",409))
        next() 
    }
)