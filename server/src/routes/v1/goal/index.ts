import express from "express";
import {
  createGoal,
  deleteGoal,
  getGoals,
  markAsDone,
} from "../../../controllers/goalController";
import { authenticateJWT } from "../../../middlewares/authenticateJwt";

const router = express.Router();

router.get("/goal/:done", authenticateJWT, markAsDone);
router.post("/goals", authenticateJWT, createGoal);
router.get("/goals", authenticateJWT, getGoals);
router.delete("/goal/:id", authenticateJWT, deleteGoal);

export default router;
