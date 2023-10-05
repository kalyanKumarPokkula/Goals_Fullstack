import mongoose from "mongoose";
import { DBURL } from "./config";

export const connect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://akhilkalyan:Kalyan123@cluster0.fqm7swm.mongodb.net/Goals-DB"
    );
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Not able to connect a DB");
    console.log(error);
  }
};
