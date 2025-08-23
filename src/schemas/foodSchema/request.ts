import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const createComboSchema = z
  .object({
    name: z.string().min(2).max(100),
    price: z.number().min(0),
    image: z.string().optional(),
  })
  .openapi({
    example: {
      name: "Combo 1",
      price: 9.99,
      image: "https://example.com/image.jpg",
    },
  });

export const getComboQuery = z.object({
  name: z.string().min(2).max(100).optional(),
  price: z.number().min(0).optional(),
  search: z.string().optional(),
}).openapi({
  example:{
    name: "Combo 1",
      price: 9.99,
      search: "Combo"
  }
});

export type CreateComboPayload = z.infer<typeof createComboSchema>;
export type GetComboPayload = z.infer<typeof getComboQuery>;
