import { UserRepository } from "../repositorys/userRepository";
import { UserI } from "../models/user";
import { LoginI, PayloadToJwt, AuthResponse } from "../common/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        let token = this.generateJwt({ userId: user._id, email: user.email });
        let response: AuthResponse = {
          username: user.name,
          token: token,
        };

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

      if (user) {
        if (this.comparePassword(data.password, user.password)) {
          let token = this.generateJwt({ userId: user._id, email: user.email });
          let response: AuthResponse = {
            username: user.name,
            token: token,
          };

          return response;
        } else {
          console.log("Incorrect Password");

          throw { message: "incorrect Password" };
        }
      } else {
        throw { message: "incorrect email" };
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
}
