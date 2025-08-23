import User from "../models/userModel";
import { SignUpReq } from "../schemas/userSchema";

export const userRepo = {
  /**
   * Find a user by email
   */
  async findByEmail(email: string) {
    return User.findOne({ email }).exec();
  },

  /**
   * Create a new user document
   */
  async create(payload: SignUpReq) {
    const created = await User.create(payload);
    return created;
  },

  /**
   * Find a user by referral code
   */
  async findByReferralCode(referralCode: string) {
    return User.findOne({ referralCode }).exec();
  },

  /**
   * Get a user by id
   */

  async getUserById(id: string) {
    const user = await User.findById(id).lean();
    return user;
  },
};
