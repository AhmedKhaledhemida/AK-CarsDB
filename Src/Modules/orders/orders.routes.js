import { Router } from "express";
import { checkToken } from "../../Middlewares/checktoken.js";
import { buyCar, myOrders, removeOrder } from "./orders.controller.js";

const orderRouter = Router();

orderRouter.use(checkToken);
orderRouter.get("/", myOrders);
orderRouter.put("/:id", buyCar);
orderRouter.put("/remove/:id", removeOrder);

export default orderRouter;
