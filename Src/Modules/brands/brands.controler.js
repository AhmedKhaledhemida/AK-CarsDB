import { Brand } from "../../../DataBase/Models/brands.models.js";
import { Cars } from "../../../DataBase/Models/cars.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

const addBrand = catchError(async (req, res) => {
  req.body.image = req.file.filename;
  let brand = await Brand.insertMany(req.body);
  res.status(200).json({ message: "Success", data: brand });
})

const getAllBrands = catchError(async (req, res , next) => {
  let brand = await Brand.find();
  if(brand.length ===0 ) return next(new AppError('There is no brands' , 404))
  res.status(200).json({ message: "success", data: brand });
})

const getSpecificBrand = catchError(
  async (req, res , next) => {
    let brand = await Brand.findById(req.params.id);
    if (!brand) return next(new AppError("No brand with this id",404))
    let brandCars = await Cars.find({ brand: brand._id });
    res.status(200).json({ message: "success", data: brandCars });
  }
)

const updateBrand = catchError(
  async (req, res , next) => {
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    brand || next(new AppError("brand not found",404))
    !brand || res.status(200).json({ message: "success", data: brand });
  }
)

const deleteBrands = catchError(
  async (req, res , next) => {
    let brand = await Brand.findByIdAndDelete(req.params.id);
    brand || next(new AppError("brand not found",404))
    
    !brand || res.status(200).json({ message: "success", data: brand });
  }
)

export { addBrand, updateBrand, getAllBrands, getSpecificBrand, deleteBrands };
