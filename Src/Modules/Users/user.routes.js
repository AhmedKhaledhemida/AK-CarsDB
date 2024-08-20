import { Router } from "express";
import { checkemail } from "../../Middlewares/checkemail.js";
import { checkToken } from "../../Middlewares/checktoken.js";
import {
  signup,
  getusers,
  updateuser,
  deleteuser,
  signIn,
} from "./user.conroler.js";
import { validations } from "../../Middlewares/validation.js";
import { signinVal, signupVal } from "./user.validation.js";

const userRouter = Router();
userRouter.post("/signup", 
  validations(signupVal), 
checkemail, signup);
userRouter.post("/signin", 
  validations(signinVal), 
  signIn);

userRouter.use(checkToken);
userRouter.get("/", getusers);
userRouter.put("/", updateuser);
userRouter.delete("/", deleteuser);

export default userRouter;
