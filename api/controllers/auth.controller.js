/* eslint-disable no-unused-vars */
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = await User.findOne({ username });
  const newUser = new User({ username, email, password: hashedPassword });
  if (user) {
    return res.status(409).json({
      message: "User Already Exists",
      status: 409,
    });
  }
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const validUser = await User.findOne({ username });
  if (!validUser)
    return res.status(404).json({
      message: "User not found",
      status: 404,
    });
  const validPass = await bcryptjs.compare(password, validUser.password);
  if (validPass) {
    const { password: pass, ...safeData } = validUser._doc;
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ user: safeData }, process.env.JWT_SECRET);

    console.log(token);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Login successful",
        status: 200,
        user: safeData,
        token,
      });
  } else {
    next(errorHandler(res, 401, "Unauthorized"));
  }
};
