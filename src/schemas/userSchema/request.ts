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

export type SignUpReq = z.infer<typeof signUpSchema>;
