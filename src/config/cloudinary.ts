import { v2 as cloudinary } from 'cloudinary'
import { env } from '../commons/env';

cloudinary.config({
  cloud_name: env.cloudinary.cloud_name as string,
  api_key: env.cloudinary.api_key as string,
  api_secret: env.cloudinary.api_secret as string
});

export default cloudinary;
