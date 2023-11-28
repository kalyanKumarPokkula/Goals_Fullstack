import { atom } from "recoil";
type GoalI = {
  _id: string;
  userId: string;
  goal: string;
  done: boolean;
  priority: string;
};

let goals: GoalI[] = [];

export const goalState = atom({
  key: "todoState",
  default: goals,
});
