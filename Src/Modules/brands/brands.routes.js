import { Router } from "express";
import {
  addBrand,
  deleteBrands,
  getAllBrands,
  getSpecificBrand,
  updateBrand,
} from "./brands.controler.js";
import { checkAdmin } from "../../Middlewares/checkAdmin.js";
import { checkToken } from "../../Middlewares/checktoken.js";
import { uploadSingleFile } from "../../FileUpload/fileUpload.js";
import { validations } from "../../Middlewares/validation.js";
import { brandVal } from "./brand.validation.js";

const brandsaRouter = Router();

brandsaRouter.get("/", getAllBrands);
brandsaRouter.get("/:id", getSpecificBrand);

brandsaRouter.use(checkToken, checkAdmin);
brandsaRouter.post(
  "/",
  uploadSingleFile("image", "brands"),
  validations(brandVal),

  addBrand
);
brandsaRouter.put("/:id", updateBrand);
brandsaRouter.delete("/:id", deleteBrands);

export default brandsaRouter;
