import { Router } from "express";
import { MythService } from "../services/index.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  try {
    const myths = await MythService.getLatestMyths();
    res.render("home", { myths });
  } catch (err) {
    console.error(err);
    res.render("home", { myths: [] });
  }
});

export default homeController;
