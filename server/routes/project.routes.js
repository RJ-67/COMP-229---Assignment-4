import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";


const router = express.Router();

router.get("/api/projects", projectCtrl.list);
router.post("/api/projects", projectCtrl.create);
router.param("projectId", projectCtrl.projectByID);
router.get("/api/projects/:projectId", projectCtrl.read);
router.put("/api/projects/:projectId", projectCtrl.update);

router.delete(
  "/api/projects/:projectId",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  projectCtrl.remove
);

export default router;
