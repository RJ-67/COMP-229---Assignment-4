import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

// CREATE USER (Signup)
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// LIST ALL USERS
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created role");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// LOAD USER BY ID
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

// READ USER PROFILE (remove sensitive fields)
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// UPDATE USER
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();

    await user.save();

    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// DELETE USER
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();

    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;

    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// DELETE MANY USERS
const removeMany = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ error: "Please provide an array of IDs to delete." });
    }

    const result = await User.deleteMany({ _id: { $in: ids } });

    res.json({
      message: `${result.deletedCount} user(s) deleted successfully.`,
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  userByID,
  read,
  list,
  remove,
  removeMany,
  update,
};
