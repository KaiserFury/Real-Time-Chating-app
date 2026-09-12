import express from "express";
import {
  checkUsername,
  getCurrentUser,
  logout,
  register,
  userLogin,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/register")
  .post((req, res, next) => {
  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, register);

router
  .route("/check-username")
  .get(checkUsername);

router
  .route("/login")
  .post(userLogin);

// Protected route: authenticate must attach req.user before the controller runs.
router
  .route("/me")
  .get(authenticate, getCurrentUser);
  
router 
  .route("/logout")
  .post(logout);

export { router as registerRoute };
