import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const createComboRes = z
  .object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string().url(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number().optional(),
  })
  .openapi({
    example: {
      _id: "68a814e04add750d3f4b66e7",
      name: "Combo Meal",
      price: 9.99,
      image: "http://example.com/image.jpg",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
      __v: 0,
    },
  });

export const getComboRes = z
  .object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string().url(),
    creator: z.string(),
    available: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number().optional(),
  })
  .openapi({
    example: {
      _id: "68a9df432558d13c663e774d",
      name: "Afang Soup",
      price: 6000,
      image:
        "https://res.cloudinary.com/djadnfkrp/image/upload/v1755963203/bigbuys/a6pvjgyuipomrwhohj8f.png",
      creator: "68a9da58070410484ecf307b",
      available: true,
      createdAt: "2025-08-23T15:33:23.529Z",
      updatedAt: "2025-08-23T15:33:23.529Z",
      __v: 0,
    },
  });
