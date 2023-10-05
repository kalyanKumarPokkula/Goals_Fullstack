import { User, UserI } from "../models/user";

export class UserRepository {
  async signUp(data: UserI) {
    try {
      let user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the User Repo");
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      let user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log("Something went wrong in the User Repo");
      throw error;
    }
  }

  async findById(userId: string) {
    try {
      let user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the User Repo");
      throw error;
    }
  }
}
