import { model, Schema, Document } from "mongoose";

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
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

    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: "",
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: undefined,
    },
    verifyToken: {
      type: String,
      default: "",
    },
    verifyTokenExpiry: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
