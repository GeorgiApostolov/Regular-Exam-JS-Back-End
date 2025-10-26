import { Router } from "express";
import { MythService, userService } from "../services/index.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const mythController = Router();

mythController.get("/create", isAuth, (req, res) => {
  res.render("myths/create");
});

mythController.post("/create", isAuth, async (req, res) => {
  const mythData = req.body;
  const userId = req.user.id;

  try {
    MythService.create(mythData, userId);
    res.redirect("/");
  } catch (err) {
    res.render("myths/create", { error: getErrorMessage(err), myth: mythData });
  }
});

mythController.get("/details/:mythId", async (req, res) => {
  try {
    const mythId = req.params.mythId;
    const myth = await MythService.getMythById(mythId);

    if (!myth) {
      return res.redirect("/dashboard");
    }

    const isAuthenticated = !!req.user;
    const isOwner =
      req.user && myth.owner && myth.owner.toString() === req.user.id;
    const hasLiked =
      myth.likedList &&
      myth.likedList.length > 0 &&
      req.user &&
      myth.likedList.some((userId) => userId.toString() === req.user.id);

    res.render("details", { myth, isAuthenticated, isOwner, hasLiked });
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

mythController.post("/details/:mythId/like", isAuth, async (req, res) => {
  try {
    const mythId = req.params.mythId;
    const userId = req.user.id;

    await MythService.toggleLike(mythId, userId);
    res.redirect(`/myths/details/${mythId}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/myths/details/${mythId}`);
  }
});

mythController.get("/edit/:mythId", isAuth, async (req, res) => {
  try {
    const mythId = req.params.mythId;
    const myth = await MythService.getMythById(mythId);

    if (!myth) {
      return res.redirect("/dashboard");
    }

    // Check if user is the owner
    if (!myth.owner || myth.owner.toString() !== req.user.id) {
      return res.redirect("/dashboard");
    }

    res.render("myths/edit", { myth });
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

mythController.post("/edit/:mythId", isAuth, async (req, res) => {
  try {
    const mythId = req.params.mythId;
    const myth = await MythService.getMythById(mythId);

    if (!myth) {
      return res.redirect("/dashboard");
    }

    // Check if user is the owner
    if (!myth.owner || myth.owner.toString() !== req.user.id) {
      return res.redirect("/dashboard");
    }

    const mythData = req.body;
    await MythService.updateMyth(mythId, mythData);
    res.redirect(`/myths/details/${mythId}`);
  } catch (err) {
    const myth = await MythService.getMythById(req.params.mythId);
    res.render("myths/edit", {
      error: getErrorMessage(err),
      myth: { ...myth, ...req.body },
    });
  }
});

mythController.post("/delete/:mythId", isAuth, async (req, res) => {
  try {
    const mythId = req.params.mythId;
    const myth = await MythService.getMythById(mythId);

    if (!myth) {
      return res.redirect("/dashboard");
    }

    // Check if user is the owner
    if (!myth.owner || myth.owner.toString() !== req.user.id) {
      return res.redirect("/dashboard");
    }

    await MythService.deleteMyth(mythId);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

export default mythController;
