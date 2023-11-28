import { Schema, model } from "mongoose";

export interface GoalI {
  goal: string;
  userId: Schema.Types.ObjectId;
  done?: boolean;
  priority?: boolean;
}

const goalSchema = new Schema<GoalI>(
  {
    goal: {
      type: String,
      required: true,
      min: 5,
    },
    priority: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const Goal = model("Goal", goalSchema);
