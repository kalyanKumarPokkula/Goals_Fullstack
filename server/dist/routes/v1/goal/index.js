"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goalController_1 = require("../../../controllers/goalController");
const authenticateJwt_1 = require("../../../middlewares/authenticateJwt");
const router = express_1.default.Router();
router.get("/goal/:done", authenticateJwt_1.authenticateJWT, goalController_1.markAsDone);
router.post("/goals", authenticateJwt_1.authenticateJWT, goalController_1.createGoal);
router.get("/goals", authenticateJwt_1.authenticateJWT, goalController_1.getGoals);
exports.default = router;
