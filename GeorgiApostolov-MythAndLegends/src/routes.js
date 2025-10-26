import { Router } from "express";
import homeController from "./controllers/homeController.js";
import dashboardController from "./controllers/dashboardController.js";
import reportController from "./controllers/reportController.js";
import errorController from "./controllers/errorController.js";
import userController from "./controllers/userController.js";
import mythController from "./controllers/mythController.js";

const routes = Router();

routes.use(homeController);
routes.use("/dashboard", dashboardController);
routes.use("/report", reportController);
routes.use("/users", userController);
routes.use("/myths", mythController);

routes.use(errorController);

export default routes;
