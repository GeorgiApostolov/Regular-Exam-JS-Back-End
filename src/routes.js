import { Router } from "express";
import homeController from "./controllers/homeController.js";
import errorController from "./controllers/errorController.js";

const routes = Router();

routes.use(homeController);

routes.use(errorController);

export default routes;
