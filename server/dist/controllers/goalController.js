"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoals = exports.createGoal = void 0;
const goalService_1 = require("../services/goalService");
const common_1 = require("../common/common");
const zod_1 = require("zod");
const goalService = new goalService_1.GoalService();
const GoalInput = zod_1.z.object({
    goal: zod_1.z.string().min(2),
});
const createGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = GoalInput.safeParse(req.body);
        if (!payload.success) {
            return res.status(411).json((0, common_1.commanResponse)({
                success: false,
                message: payload.error.issues[0].message,
                err: payload.error.issues,
            }));
        }
        let userId = req.headers.userId;
        if (typeof userId === "string") {
            let response = yield goalService.createGoal({
                goal: payload.data.goal,
                userId: userId,
            });
            return res.status(201).json((0, common_1.commanResponse)({
                data: response,
                message: "successfully created a goal",
                success: true,
            }));
        }
    }
    catch (error) {
        return res.status(500).json((0, common_1.commanResponse)({
            message: "Something went wrong in the creation of goal",
            success: false,
        }));
    }
});
exports.createGoal = createGoal;
const getGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.headers.userId;
        if (typeof userId === "string") {
            let response = yield goalService.getAllGoal(userId);
            return res.status(200).json((0, common_1.commanResponse)({
                data: response,
                message: "successfully fetched all goals",
                success: true,
            }));
        }
    }
    catch (error) {
        return res.status(500).json((0, common_1.commanResponse)({
            message: "Something went wrong in the fetched of goals",
            success: false,
        }));
    }
});
exports.getGoals = getGoals;
