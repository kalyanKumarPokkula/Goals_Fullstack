import express from "express";
import { createGoal, getGoals } from "../../../controllers/goalController";
import { authenticateJWT } from "../../../middlewares/authenticateJwt";

const router = express.Router();

router.post("/goals", authenticateJWT, createGoal);
router.get("/goals", authenticateJWT, getGoals);

export default router;
