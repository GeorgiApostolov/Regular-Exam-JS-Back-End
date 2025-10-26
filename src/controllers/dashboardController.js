import { Router } from "express";
import { MythService } from "../services/index.js";

const dashboardController = Router();

dashboardController.get("/", async (req, res) => {
  try {
    const myths = await MythService.getAllMyths();
    res.render("dashboard", { myths });
  } catch (err) {
    console.error(err);
    res.render("dashboard", { myths: [] });
  }
});

export default dashboardController;
