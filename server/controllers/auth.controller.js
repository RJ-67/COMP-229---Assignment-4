import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

// ===========================
// SIGNUP (Create Account)
// ===========================
const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Signup successful!"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Signup failed",
      details: err.message
    });
  }
};


// ===========================
// SIGNIN (Login)
// ===========================
const signin = async (req, res) => {
  try {
    // 1. Find user by email
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).json({ error: "User not found" });

    // 2. Check password
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .json({ error: "Email and password do not match" });
    }

    // 3. Create JWT with role included
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret
    );

    // 4. Set cookie
    res.cookie("t", token, { expire: new Date() + 9999 });

    // 5. Return user info INCLUDING ROLE
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// ===========================
// SIGNOUT
// ===========================
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out",
  });
};

// ===========================
// REQUIRE SIGNIN (Auth Middleware)
// ===========================
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// ===========================
// AUTHORIZATION CHECK
// ===========================
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.auth &&
    req.profile &&
    req.auth._id == req.profile._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== "admin") {
    return res.status(403).json({
      error: "Admin access required",
    });
  }
  next();
};

export default {
  signup,
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  requireAdmin,
};
