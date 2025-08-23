import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(4).max(100),
    name: z.string().min(4).max(100),
    phone: z.string().min(8).max(25),
    referral: z.string().optional(),
    role: z.enum(["user", "admin", "chef"]).optional(),
  })
  .openapi({
    example: {
      email: "user@example.com",
      password: "123456",
      name: "John Doe",
      phone: "+234812345678",
      referral: "REF123",
      role: "user",
    },
  });

export const signInSchema = z
  .object({
    email: z.email(),
    password: z.string().min(4).max(100),
  })
  .openapi({
    example: {
      email: "user@example.com",
      password: "123456",
    },
  });

export const userResponse = z
  .object({
    _id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(), // hashed password stored in DB (usually omitted from public responses)
    phone: z.string().optional(),
    role: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    referralCode: z.string().optional(),
    __v: z.number().optional(),
  })
  .openapi({
    example: {
      _id: "68a814e04add750d3f4b66e7",
      name: "John Doe",
      email: "user@example.com",
      password: "$2b$10$HUD33eFHmuRERomJfBEsDehwMcT5tVnWrbnQIF.41wo/xBcrgCWl2",
      phone: "+234812345678",
      role: "user",
      createdAt: "2025-08-22T06:57:36.815Z",
      updatedAt: "2025-08-22T06:57:36.815Z",
      referralCode: "5BB3CJEH",
      __v: 0,
    },
  });

export type SignUpReq = z.infer<typeof signUpSchema>;
export type UserResponse = z.infer<typeof userResponse>;
