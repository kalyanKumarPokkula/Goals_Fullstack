"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./v1/auth"));
const goal_1 = __importDefault(require("./v1/goal"));
const router = express_1.default.Router();
console.log("route");
router.use("/auth", auth_1.default);
router.use("/v1", goal_1.default);
exports.default = router;
