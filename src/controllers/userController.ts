import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/userModel";
import { userRepo } from "../repository/userRepository";
import { signInSchema, signUpSchema } from "../schemas/userSchema";
import { generateToken } from "../utils/requestResponse";

export const signup = asyncHandler(async (req, res) => {
  const payload = signUpSchema.parse(req.body);
  const { name, email, password } = payload;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const userExists = await userRepo.findByEmail(email);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await userRepo.create(payload);

  if (user) {
    const token = generateToken(res, user._id.toString());
    res.status(201).json({
      user,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create user.");
  }
});

export const signin = asyncHandler(async (req, res) => {
  const payload = signInSchema.parse(req.body);
  const { email, password } = payload;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await userRepo.findByEmail(email);

  if (user && (await (user as any).matchPassword(password))) {
    const token = generateToken(res, user._id.toString());
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid login details");
  }
});
