import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/userModel";
import { signUpSchema } from "../schemas/userSchema";

export const signup = asyncHandler(async (req, res) => {
    const payload = signUpSchema.parse(req.body);
  const { name, email, password } = payload;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // generateToken(res, user._id);
    res.status(201).json({
      _id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create user.");
  }
});