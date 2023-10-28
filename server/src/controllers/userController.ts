import { UserService } from "../services/userService";
import { z } from "zod";
import { Request, Response } from "express";
import { commanResponse } from "../common/common";
import { User } from "../models/user";

const userService: UserService = new UserService();

const signUpInput = z.object({
  name: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(3),
});

const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const signUp = async (req: Request, res: Response) => {
  try {
    let payload = signUpInput.safeParse(req.body);
    if (!payload.success) {
      return res
        .status(411)
        .json(commanResponse({ err: payload.error.issues, success: false }));
    }

    let name =
      payload.data.name.charAt(0).toUpperCase() + payload.data.name.slice(1);
    let email = payload.data.email;
    let password = payload.data.password;

    let user = await userService.findByEmail(email);
    if (user) {
      return res
        .status(403)
        .json(
          commanResponse({ success: false, message: "User already exists" })
        );
    } else {
      let response = await userService.signUp({ name, email, password });
      return res.status(201).json(
        commanResponse({
          data: response,
          success: true,
          message: "Successfully created a User",
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      commanResponse({
        success: false,
        message: "Something went wrong in creating a user",
      })
    );
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    let payload = signInInput.safeParse(req.body);
    if (!payload.success) {
      return res
        .status(411)
        .json(commanResponse({ success: false, err: payload.error.issues }));
    }

    let email = payload.data.email;
    let password = payload.data.password;

    let response = await userService.signIn({ email, password });
    if (response.status === 553) {
      return res.status(200).json(
        commanResponse({
          success: false,
          message: "Invalid Email",
        })
      );
    } else if (response.status === 401) {
      return res.status(200).json(
        commanResponse({
          success: false,
          message: "Incorrect Password",
        })
      );
    } else if (response.isVerified === false) {
      return res.status(200).json(
        commanResponse({
          success: false,
          message: "Not verified",
        })
      );
    } else {
      return res.status(200).json(
        commanResponse({
          success: true,
          message: "Successfully Logged In",
          data: response,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      commanResponse({
        success: false,
        message: "Something went wrong in Login a user",
      })
    );
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    let { token } = req.query;
    console.log(req.query);

    console.log(token);

    let user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invaild token",
        success: false,
      });
    }

    user.isVerified = true;
    user.verifyToken = "";
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ errro: error.message });
  }
};

const user = async (req: Request, res: Response) => {
  try {
    if (typeof req.headers.userId === "string") {
      let response = await userService.findById(req.headers.userId);
      return res.status(200).json(
        commanResponse({
          message: "Successfully fetched a User",
          success: true,
          data: response,
        })
      );
    }
  } catch (error) {
    return res
      .status(500)
      .json(commanResponse({ success: false, message: "User doesn't exists" }));
  }
};

export { signIn, signUp, user, verifyEmail };
