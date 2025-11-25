import Qualification from "../models/qualification.model.js";
import extend from "lodash/extend.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

// ===============================
// CREATE QUALIFICATION
// ===============================
const create = async (req, res) => {
  const qualification = new Qualification(req.body);

  try {
    await qualification.save();
    return res.status(200).json({
      message: "Successfully created!",
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// ===============================
// LIST ALL QUALIFICATIONS
// ===============================
const list = async (req, res) => {
  try {
    let qualifications = await Qualification.find().select(
      "school program year"
    );
    res.json(qualifications);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// ===============================
// LOAD QUALIFICATION BY ID
// ===============================
const qualificationByID = async (req, res, next, id) => {
  try {
    let qualification = await Qualification.findById(id);

    if (!qualification)
      return res.status(400).json({
        error: "Qualification not found",
      });

    req.qualification = qualification;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve qualification",
    });
  }
};

// ===============================
// READ A SINGLE QUALIFICATION
// ===============================
const read = (req, res) => {
  return res.json(req.qualification);
};

// ===============================
// UPDATE QUALIFICATION
// ===============================
const update = async (req, res) => {
  try {
    let qualification = req.qualification;
    qualification = extend(qualification, req.body);
    qualification.updated = Date.now();

    await qualification.save();
    res.json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// ===============================
// DELETE SINGLE QUALIFICATION
// ===============================
const remove = async (req, res) => {
  try {
    let qualification = req.qualification;
    await qualification.deleteOne();

    return res.status(200).json({
      message: "Successfully deleted!",
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// ===============================
// DELETE MULTIPLE QUALIFICATIONS
// ===============================
const removeMany = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: "Please provide an array of IDs.",
    });
  }

  try {
    const result = await Qualification.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: `${result.deletedCount} qualifications successfully deleted!`,
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  list,
  read,
  update,
  remove,
  removeMany,
  qualificationByID,
};
