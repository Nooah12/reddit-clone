import { z } from "zod";

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    // username: z.string().min(3, 'must be at least 3 characters')
})

export const createPostSchema = z.object({
    title: z.string().min(3, 'title must be at least 3 characters'),
    content: z.string() // .optional() ifall den får va null, på img t.ex kanske
  })