import { model, Schema, Document } from "mongoose";

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserI>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 3,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
