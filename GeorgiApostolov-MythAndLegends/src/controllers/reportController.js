import { Router } from "express";
import { MythService } from "../services/index.js";

const reportController = Router();

reportController.get("/", async (req, res) => {
  try {
    const myths = await MythService.getAllMythsWithOwners();
    res.render("report", { myths });
  } catch (err) {
    console.error(err);
    res.render("report", { myths: [], error: "Error loading report!" });
  }
});

export default reportController;
