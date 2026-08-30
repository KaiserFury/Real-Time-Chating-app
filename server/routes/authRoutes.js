import express from "express";
import { checkUsername, getCurrentUser, logout, register, userLogin } from "../controllers/authController.js"
import { authenticate } from "../middleware/authenticate.js";


const router = express.Router()



router
  .route("/register")
  .post(register);

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


export {router as registerRoute};
