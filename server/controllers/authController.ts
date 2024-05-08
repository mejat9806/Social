import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, role, password, passwordConfirmed } = req.body;

    if (!email) {
      return res.json({ error: { email: "Please enter a valid email" } });
    }
    if (!password || !passwordConfirmed) {
      return res.json({ error: "Please enter a valid password" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ error: "User already exists" });
    }
    const newUser = await User.create({
      email,
      role,
      password,
      passwordConfirmed,
      name,
    });
    return res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    console.log(password, email);
    if (!email || !password) {
      return res.status(404).json({ error: "email and password are required" });
    }
    const user: any = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
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
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};
