import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Roles } from "../commons/types";
import { generateUniqueReferralCode } from "../utils/utils";

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
    phone: {
      type: String,
      required: [true, "Please enter a phone number"],
      minlength: 8,
      maxlength: 25,
    },

    referralCode: {
      type: String,
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

/**
 * Before saving a new user, ensure a unique referralCode exists
 */
userSchema.pre("save", async function (next) {
  // only set for new documents or when referralCode not present
  if (this.isNew && !this.referralCode) {
    try {
      this.referralCode = await generateUniqueReferralCode();
    } catch (err) {
      return next(err as Error);
    }
  }
  next();
});

// Add a method for verifying passwords (if needed for login)
userSchema.methods.matchPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
