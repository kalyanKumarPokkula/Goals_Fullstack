import { GoalService } from "../services/goalService";
import { Request, Response } from "express";
import { commanResponse } from "../common/common";
import { z } from "zod";

const goalService: GoalService = new GoalService();

const GoalInput = z.object({
  goal: z.string().min(2),
  priority: z.string(),
});

const createGoal = async (req: Request, res: Response) => {
  try {
    let payload = GoalInput.safeParse(req.body);
    if (!payload.success) {
      return res.status(411).json(
        commanResponse({
          success: false,
          message: payload.error.issues[0].message,
          err: payload.error.issues,
        })
      );
    }

    let userId = req.headers.userId;

    console.log(payload);

    if (typeof userId === "string") {
      let response = await goalService.createGoal({
        goal: payload.data.goal,
        priority: payload.data.priority,
        userId: userId,
      });
      return res.status(201).json(
        commanResponse({
          data: response,
          message: "successfully created a goal",
          success: true,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      commanResponse({
        message: "Something went wrong in the creation of goal",
        success: false,
      })
    );
  }
};

const getGoals = async (req: Request, res: Response) => {
  try {
    let userId = req.headers.userId;

    if (typeof userId === "string") {
      let response = await goalService.getAllGoal(userId);

      return res.status(200).json(
        commanResponse({
          data: response,
          message: "successfully fetched all goals",
          success: true,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      commanResponse({
        message: "Something went wrong in the fetched of goals",
        success: false,
      })
    );
  }
};

const markAsDone = async (req: Request, res: Response) => {
  try {
    let goalId = req.params.done;

    let response = await goalService.markGoalAsDone(goalId);
    if (response) {
      return res.status(200).json(
        commanResponse({
          data: response,
          message: "successfully fetched all goals",
          success: true,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      commanResponse({
        message: "Something went wrong making goal done as true",
        success: false,
      })
    );
  }
};

const deleteGoal = async (req: Request, res: Response) => {
  try {
    let response = await goalService.deleteGoal(req.params.id);
    if (response) {
      return res.status(200).json(
        commanResponse({
          message: "Successfully deleted a goal",
          data: response,
          success: true,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      commanResponse({
        message: "Something went wrong making goal done as true",
        success: false,
      })
    );
  }
};

export { createGoal, getGoals, markAsDone, deleteGoal };
