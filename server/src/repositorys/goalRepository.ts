import { Goal, GoalI } from "../models/goal";

export class GoalRepository {
  async createGoal(data: GoalI) {
    try {
      let goal = await Goal.create(data);
      return goal;
    } catch (error) {
      console.log("Something went wrong in the Goal Repo");
      throw error;
    }
  }

  async markAsDone(goalId: string) {
    try {
      let goal = await Goal.findByIdAndUpdate(goalId, { done: true });
      return goal;
    } catch (error) {
      console.log("Something went wrong in the Goal Repo");
      throw error;
    }
  }

  async getAllGoals(userId: string) {
    try {
      let goals = await Goal.find({ userId: userId });

      return goals;
    } catch (error) {
      console.log("Something went wrong in the Goal Repo");
      throw error;
    }
  }
}
