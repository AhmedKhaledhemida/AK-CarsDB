import brandsRouter from "./brands/brands.routes.js";
import carsRouter from "./cars/cars.routes.js";
import orderRouter from "./orders/orders.routes.js";
import userRouter from "./Users/user.routes.js";

export const bootstrap = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/brands", brandsRouter);
  app.use("/api/cars", carsRouter);
  app.use("/api/orders", orderRouter);
};
