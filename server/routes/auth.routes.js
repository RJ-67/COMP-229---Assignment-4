import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/auth/signup").post(authCtrl.signup);
router.route("/auth/signin").post(authCtrl.signin);
router.route("/auth/signout").get(authCtrl.signout);
router.get("/auth/protected", authCtrl.requireSignin, (req, res) => {
  res.json({
    message: "You are signed into a protected route!",
    userId: req.auth._id,
  });
});

export default router;
