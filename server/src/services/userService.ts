import { UserRepository } from "../repositorys/userRepository";
import { UserI } from "../models/user";
import { LoginI, PayloadToJwt, AuthResponse } from "../common/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/mailer";
import { user } from "../controllers/userController";

export class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(data: any) {
    try {
      let hashPass = this.hashPassword(data.password);
      data.password = hashPass;
      let user = await this.userRepository.signUp(data);
      if (user) {
        // let token = this.generateJwt({ userId: user._id, email: user.email });
        let response: AuthResponse = {
          username: user.name,
          // token: token,
          status: 201,
          // isVerfied: user.isVerfied!,
        };

        await sendEmail(user.email, "VERIFY", user._id);

        return response;
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in the User Service");
      throw error;
    }
  }

  async signIn(data: LoginI) {
    try {
      let user = await this.userRepository.findByEmail(data.email);

      if (!user?.isVerified) {
        let response: AuthResponse = {
          isVerified: user?.isVerified,
        };
        return response;
      }

      if (user) {
        if (this.comparePassword(data.password, user.password)) {
          let token = this.generateJwt({ userId: user._id, email: user.email });
          let response: AuthResponse = {
            username: user.name,
            token: token,
            status: 200,
          };

          return response;
        } else {
          console.log("Incorrect Password");

          return { status: 401 };
        }
      } else {
        return { status: 553 };
      }
    } catch (error) {
      console.log("Somethign went wrong in the User Service");
      throw error;
    }
  }

  comparePassword(pass: string, hashPass: string) {
    try {
      return bcrypt.compareSync(pass, hashPass);
    } catch (error) {
      console.log("incorrect password");
      throw error;
    }
  }

  generateJwt(userPayload: PayloadToJwt) {
    try {
      let payload = { id: userPayload.userId, email: userPayload.email };
      let token = jwt.sign(payload, "avi", {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.log("Something went wrong in token generate ");
      throw error;
    }
  }

  hashPassword(password: string) {
    try {
      return bcrypt.hashSync(password, 10);
    } catch (error) {
      console.log("Something went wrong while hashing the password");
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      let user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      console.log("Something went wrong while hashing the password");
      throw error;
    }
  }

  async findById(userId: string) {
    try {
      let user = await this.userRepository.findById(userId);
      if (user) {
        return { username: user.name };
      }
    } catch (error) {
      console.log("Something went wrong while hashing the password");
      throw error;
    }
  }

  async forgottenPassword(email: string) {
    try {
      let user = await this.userRepository.findByEmail(email);

      if (!user) {
        return false;
      }

      await sendEmail(user.email, "RESET", user._id);

      return true;
    } catch (error) {
      console.log("Something went wrong in fetching user");
      throw error;
    }
  }
}
