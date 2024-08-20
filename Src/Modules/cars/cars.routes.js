import { Router } from "express";
import { uploadSingleFile } from "../../FileUpload/fileUpload.js";
import { checkAdmin } from "../../Middlewares/checkAdmin.js";
import { validations } from "../../Middlewares/validation.js";
import {
  addCars,
  deleteCars,
  getAllCars,
  getSoldCars,
  getSpecificCar,
  updateCars,
} from "./cars.controler.js";
import { carVal } from "./cars.validation.js";
import { checkToken } from "../../Middlewares/checktoken.js";

const carsRouter = Router();

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", getSpecificCar);

carsRouter.use(checkToken);
carsRouter.use(checkAdmin);

carsRouter.get("/sold", getSoldCars);
carsRouter.post(
  "/",
  uploadSingleFile("image", "cars"),
  validations(carVal),
  addCars
);
carsRouter.put("/:id", updateCars);
carsRouter.delete("/:id", deleteCars);

export default carsRouter;
