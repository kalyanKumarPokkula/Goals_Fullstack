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
exports.GoalService = void 0;
const userRepository_1 = require("../repositorys/userRepository");
const goalRepository_1 = require("../repositorys/goalRepository");
class GoalService {
    constructor() {
        this.goalRepository = new goalRepository_1.GoalRepository();
        this.userRepository = new userRepository_1.UserRepository();
    }
    createGoal(GoalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.findById(GoalData.userId);
                if (user) {
                    let goal = yield this.goalRepository.createGoal({
                        goal: GoalData.goal,
                        userId: user._id,
                    });
                    return goal;
                }
                else {
                    throw { message: "User doesn't exist" };
                }
            }
            catch (error) {
                console.log("Something went wrong in the Goal Service");
                throw error;
            }
        });
    }
    getAllGoal(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let goals = yield this.goalRepository.getAllGoals(userId);
                return goals;
            }
            catch (error) {
                console.log("Something went wrong in the Goal Service");
                throw error;
            }
        });
    }
    markGoalAsDone(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedGoal = yield this.goalRepository.markAsDone(goalId);
                return updatedGoal;
            }
            catch (error) {
                console.log("Something went wrong in the Goal Service");
                throw error;
            }
        });
    }
    deleteGoal(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let goal = yield this.goalRepository.deleteGoal(goalId);
                return goal;
            }
            catch (error) {
                console.log("Something went wrong in the Goal Service");
                throw error;
            }
        });
    }
}
exports.GoalService = GoalService;
