import express from "express";
import {
  signIn,
  signUp,
  user,
  verifyEmail,
} from "../../../controllers/userController";
import { authenticateJWT } from "../../../middlewares/authenticateJwt";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", authenticateJWT, user);
router.post("/verifyemail", verifyEmail);

export default router;
