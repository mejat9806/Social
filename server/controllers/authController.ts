import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";

import { AppError } from "../utils/appError";
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, role, password, passwordConfirmed } = req.body;

      if (!email) {
        return res.json({ error: { email: "Please enter a valid email" } });
      }
      if (!password || !passwordConfirmed) {
        return res.json({ error: "Please enter a valid password" });
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        return next(AppError("User already exists", 401));
      }
      const newUser = await User.create({
        email,
        role,
        password,
        passwordConfirmed,
        username,
      });
      return res.json(newUser);
    } catch (error) {
      console.log(error);
    }
  },
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      console.log(password, email);
      if (!email || !password) {
        return next(AppError("Please enter a email and password", 401));
      }
      const user: any = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return next(AppError("yser did not exist", 401));
      }
      const match = await user.correctPassword(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "password  wrong" });
      }
      if (match) {
        jwt.sign(
          { email: user.email, id: user._id, name: user.name, role: user.role },
          process.env.JWT_SECRET as string,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                maxAge: 10000000000000,
                httpOnly: true,
                sameSite: "lax",
              })
              .json(user);
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, user) => {
        if (err) throw err;
        res.json(user);
      });
    } else {
      res.json(null);
    }
  },
);
