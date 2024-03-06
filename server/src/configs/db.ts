import mongoose from "mongoose";
import { DBURL } from "./config";

export const connect = () => {
  try {
    mongoose.connect(DBURL!);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Not able to connect a DB");
    console.log(error);
  }
};
