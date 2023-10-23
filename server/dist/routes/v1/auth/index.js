"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../../controllers/userController");
const authenticateJwt_1 = require("../../../middlewares/authenticateJwt");
const router = express_1.default.Router();
router.post("/signup", userController_1.signUp);
router.post("/signin", userController_1.signIn);
router.get("/me", authenticateJwt_1.authenticateJWT, userController_1.user);
router.post("/verifyemail", userController_1.verifyEmail);
exports.default = router;
