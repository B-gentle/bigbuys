import dotenv from "dotenv";
dotenv.config();

export const env = {
    MONGO_URI: process.env.MONGO_URI as string,
    LOG_LEVEL: process.env.LOG_LEVEL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT ?? 5000,
    cloudinary:{
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}