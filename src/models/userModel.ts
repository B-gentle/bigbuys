import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Roles } from "../commons/types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },

    role: {
      type: String,
      required: [true, "Please enter a valid role"],
      enum: Roles,
      default: Roles.user,
    },
  },
  {
    timestamps: true,
  }
);

// Hashing passwords before saving (optional if you're using authentication libraries)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Add a method for verifying passwords (if needed for login)
userSchema.methods.matchPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;