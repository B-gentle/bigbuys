import asyncHandler from "../middlewares/asyncHandler";
import {
  createComboSchema,
  getComboQuery,
} from "../schemas/foodSchema/request";
import { foodRepo } from "../repository/foodRepository";
import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../commons/types";
import { idSchema } from "../schemas/rootSchema";

export const createCombo = asyncHandler(async (req: AuthRequest, res) => {
  const body = { ...req.body, price: Number(req.body.price) };
  delete body.image;

  const payload = createComboSchema.omit({ image: true }).parse(body) as {
    name: string;
    price: number;
    image?: string;
  };

  if (req.file) {
    const dataUri = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const file = await cloudinary.uploader.upload(dataUri, {
      folder: "bigbuys",
    });
    payload.image = file.secure_url;
  }

  const combo = await foodRepo.createCombo({
    payload,
    creator: req.user?._id as string,
  });
  res.status(201).json(combo);
});

export const getCombos = asyncHandler(async (req, res) => {
  const payload = getComboQuery.parse(req.query);
  const combos = await foodRepo.getCombos(payload);
  if (!combos) {
    res.status(404);
    throw new Error("Combo not found");
  }
  res.status(200).json(combos);
});

export const getComboById = asyncHandler(async (req, res) => {
  const params = idSchema.parse(req.params);
  const combo = await foodRepo.getComboById(params.id);
  if (!combo) {
    res.status(404);
    throw new Error("Combo not found");
  }
  res.status(200).json(combo);
});

export const updateCombo = asyncHandler(async(req, res) => {
  
})
