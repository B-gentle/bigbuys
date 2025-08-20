import mongoose from "mongoose";
import { env } from "../commons/env";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
