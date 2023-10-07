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

  async deleteGoal(goalId: string) {
    try {
      let goal = await Goal.findByIdAndDelete(goalId);
      return goal;
    } catch (error) {
      console.log("Something went wrong in the Goal Repo");
      throw error;
    }
  }

  async markAsDone(goalId: string) {
    try {
      let goal = await Goal.findById(goalId);
      if (goal) {
        goal.done = true;
        await goal.save();
      }
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
