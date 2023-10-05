import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let AuthHeader = req.headers.authorization;

    if (AuthHeader) {
      let token = AuthHeader.split(" ")[1];

      let Payload = jwt.verify(token, "avi");

      if (!Payload) {
        return res.sendStatus(403);
      }

      if (typeof Payload === "string") {
        return res.sendStatus(403);
      }

      req.headers.userId = Payload.id;
      next();
      // let user = await User.findById(Payload.id);
      // if (user) {
      //   console.log(user);
      //   req.headers.userId = user._id;
      //   next();
    }
  } catch (error) {
    return res.status(403).json({
      message: "invalid token",
      success: false,
    });
  }
};
