import { UserRepository } from "../repositorys/userRepository";
import { GoalRepository } from "../repositorys/goalRepository";
import { GoalPayload } from "../common/common";

export class GoalService {
  userRepository: UserRepository;
  goalRepository: GoalRepository;
  constructor() {
    this.goalRepository = new GoalRepository();
    this.userRepository = new UserRepository();
  }

  async createGoal(GoalData: GoalPayload) {
    try {
      let user = await this.userRepository.findById(GoalData.userId);
      if (user) {
        let goal = await this.goalRepository.createGoal({
          goal: GoalData.goal,
          userId: user._id,
        });

        return goal;
      } else {
        throw { message: "User doesn't exist" };
      }
    } catch (error) {
      console.log("Something went wrong in the Goal Service");
      throw error;
    }
  }

  async getAllGoal(userId: string) {
    try {
      let goals = await this.goalRepository.getAllGoals(userId);

      return goals;
    } catch (error) {
      console.log("Something went wrong in the Goal Service");
      throw error;
    }
  }

  async markGoalAsDone(goalId: string) {
    try {
      let updatedGoal = await this.goalRepository.markAsDone(goalId);
      return updatedGoal;
    } catch (error) {
      console.log("Something went wrong in the Goal Service");
      throw error;
    }
  }

  async deleteGoal(goalId: string) {
    try {
      let goal = await this.goalRepository.deleteGoal(goalId);
      return goal;
    } catch (error) {
      console.log("Something went wrong in the Goal Service");
      throw error;
    }
  }
}
