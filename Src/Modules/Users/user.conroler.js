import { User } from "../../../DataBase/Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

const signup = catchError(
  async (req, res) => {
    let user = new User(req.body);
    await user.save();
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.BASE_URL
    );
    res.status(200).json({ message: "success", token });
  }
)

const signIn = catchError(
  async (req, res , next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      let token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.BASE_URL
      );
      return res.status(200).json({ message: "success", token });
    }
    next(new AppError("Incorrect email or password",401))
  }
)

const getusers = catchError(
  async (req, res) => {
    let user = await User.find();
    if(user.length === 0){
      next(new AppError("There is no user",404))
    }
    else{
    res.status(200).json({ message: "success",numberofuser:user.length ,data: user });

    }
  }
)

const updateuser =catchError(
  async (req, res) => {
    let user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    user|| next(new AppError("User not Found",404))
    !user ||res.status(200).json({ message: "success", data: user });
  }
)

const deleteuser = catchError(
  async (req, res , next) => {
    let user = await User.findByIdAndDelete(req.user._id);
    user|| next(new AppError("User not Found",404))
    !user ||res.status(200).json({ message: "success", data: user });
  }
)

export { signup, signIn, getusers, updateuser, deleteuser };
