process.on("uncaughtException", (err) => {
  // return new AppError({ error: err }, 500);
  console.log({error:err})
});

import express from "express";
import { db } from "./DataBase/dbConnection.js";
import { bootstrap } from "./Src/Modules/bootstrap.js";
import cors from "cors";
import "dotenv/config";
import { globalError } from "./Src/utils/globalError.js";
import { AppError } from "./Src/utils/AppError.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

bootstrap(app);

app.use("*", (req, res, next) => {
  next(new AppError(`Route Not Found ${req.originalUrl}`, 404));
});
app.use(globalError);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  // return new AppError({ error: err }, 500);
  console.log({error:err})
});
