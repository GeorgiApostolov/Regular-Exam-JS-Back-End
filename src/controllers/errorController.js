import { Router } from "express";

const errorController = Router();

errorController.all("/*path", (req, res) => {
  res.send("Not Found");
});

export default errorController;
