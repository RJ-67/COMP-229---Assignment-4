import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";


const router = express.Router();

router.route("/api/contacts")
  .post(contactCtrl.create)
  .get(contactCtrl.list);

router.route("/api/contacts/:contactId").delete(
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.remove
);


router.param("contactId", contactCtrl.contactByID);

export default router;
