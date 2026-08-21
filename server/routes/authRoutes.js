import express from "express";
import { checkUsername, register, userLogin } from "../controllers/authController.js"


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


export {router as registerRoute};
