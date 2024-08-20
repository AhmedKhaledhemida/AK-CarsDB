import { Cars } from "../../../DataBase/Models/cars.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

const buyCar = catchError(async (req, res, next) => {
  let car = await Cars.findByIdAndUpdate(
    req.params.id,
    { $push: { soldTo: { _id: req.user._id } } },
    {
      new: true,
    }
  );
  car || next(new AppError("car not found", 404));
  !car || res.status(200).json({ message: "success", data: car });
});

const myOrders = catchError(async (req, res, next) => {
  const cars = await Cars.find({ soldTo: req.user._id }).populate("soldTo");
  if (cars.length === 0) return next(new AppError("There is no orders", 404));

  res.status(200).json({ message: "success", data: cars });
});

const removeOrder = catchError(async (req, res, next) => {
  let order = await Cars.findByIdAndUpdate(
    { _id: req.params.id, soldTo: req.params._id },
    { $pull: { soldTo: req.user._id } },
    {
      new: true,
    }
  );
  order || next(new AppError("no order with this id"));
  !order || res.status(200).json({ message: "success", data: order });
});
export { buyCar, myOrders, removeOrder };
