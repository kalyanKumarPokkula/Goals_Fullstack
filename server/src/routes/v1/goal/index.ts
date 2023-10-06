import express from "express";
import {
  createGoal,
  getGoals,
  markAsDone,
} from "../../../controllers/goalController";
import { authenticateJWT } from "../../../middlewares/authenticateJwt";

const router = express.Router();

router.get("/goal/:done", authenticateJWT, markAsDone);
router.post("/goals", authenticateJWT, createGoal);
router.get("/goals", authenticateJWT, getGoals);

export default router;
