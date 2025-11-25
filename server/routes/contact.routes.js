import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/api/contacts")
  .post(contactCtrl.create)
  .get(contactCtrl.list);

router.route("/api/contacts/:contactId")
  .delete(contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);

export default router;
