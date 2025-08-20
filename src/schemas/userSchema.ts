import z from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(100),
  name: z.string().min(4).max(100),
})

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(100),
})

export const userResponse = z.object({
    id: z.string(),
    email: z.email(),
    name: z.string().min(2).max(100),
    createdAt: z.date(),
    updatedAt: z.date(),    
})