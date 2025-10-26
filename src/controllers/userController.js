import { Router } from "express";
import { userService } from "../services/index.js";

const userController = Router();

userController.get("/register", (req, res) => {
  res.render("users/register");
});

userController.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.register(email, password);
  res.cookie("auth", token);

  res.redirect("/");

  res.end();
});

userController.get("/login", (req, res) => {
  res.render("users/login");
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);

  res.cookie("auth", token);
  res.redirect("/");
});

userController.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});
export default userController;
