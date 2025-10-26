import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
  console.log(req.body);
  res.send("It works!");
});

homeController.post("/", (req, res) => {
  console.log(req.body);
  res.send("It works!");
});

export default homeController;
