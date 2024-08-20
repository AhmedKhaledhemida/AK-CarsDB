import { Cars } from "../../../DataBase/Models/cars.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

const addCars = catchError(async (req, res) => {
  req.body.image = req.file.filename;
  let cars = await Cars.insertMany(req.body);
  res.status(200).json({ message: "success", data: cars });
});

const getSpecificCar = catchError(async (req, res, next) => {
  let car = await Cars.findById(req.params.id);
  car.soldNumber = car.soldTo.length;
  car || next(new AppError("car not found", 404));

  !car || res.status(200).json({ message: "success", data: car });
});

const getAllCars = catchError(async (req, res, next) => {
  let availableCars = await Cars.find().populate("brand soldTo");
  if (availableCars.length === 0)
    return next(new AppError("There is no cars", 404));
  availableCars = availableCars.map((car) => {
    return {
      ...car._doc, 
      soldNumber: car.soldTo.length, 
    };
  });
  
  // res.status(200).json({ message: "success",carsumber:availableCars.length ,data: user });

}
);
const updateCars = catchError(async (req, res, next) => {
  let cars = await Cars.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  cars || next(new AppError("car not found", 404));
  !cars || res.status(200).json({ message: "success", data: cars });
});

const deleteCars = catchError(async (req, res, next) => {
  let cars = await Cars.findByIdAndDelete(req.params.id);
  cars || next(new AppError("car not found", 404));
  !cars || res.status(200).json({ message: "success", data: cars });
});

const getSoldCars = catchError(async (req, res, next) => {
  let cars = await Cars.find({ isSold: "sold" }).populate(
    "soldTo",
    "name email"
  );
  if (cars.length === 0) return next(new AppError("No sold cars", 404));
  res.status(200).json({ message: "success", data: cars });
});

export {
  addCars,
  deleteCars,
  getAllCars,
  getSoldCars,
  getSpecificCar,
  updateCars,
};
