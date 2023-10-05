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
exports.GoalRepository = void 0;
const goal_1 = require("../models/goal");
class GoalRepository {
    createGoal(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let goal = yield goal_1.Goal.create(data);
                return goal;
            }
            catch (error) {
                console.log("Something went wrong in the Goal Repo");
                throw error;
            }
        });
    }
    markAsDone(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let goal = yield goal_1.Goal.findByIdAndUpdate(goalId, { done: true });
                return goal;
            }
            catch (error) {
                console.log("Something went wrong in the Goal Repo");
                throw error;
            }
        });
    }
    getAllGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let goals = yield goal_1.Goal.find({ userId: userId });
                return goals;
            }
            catch (error) {
                console.log("Something went wrong in the Goal Repo");
                throw error;
            }
        });
    }
}
exports.GoalRepository = GoalRepository;
