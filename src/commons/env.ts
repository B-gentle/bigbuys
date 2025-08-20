import dotenv from "dotenv";
dotenv.config();

export const env = {
    MONGO_URI: process.env.MONGO_URI as string,
    LOG_LEVEL: process.env.LOG_LEVEL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
}