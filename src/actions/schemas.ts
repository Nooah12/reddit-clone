import { z } from "zod";

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const postSchema = z.object({
    title: z.string().min(3, 'This field is required and cannot be empty'),
    content: z.string().min(3, 'This field is required and cannot be empty'),
    image: z.instanceof(FormData).optional(),
  })

export const commentSchema = z.object({
    comment: z.string().min(1, 'This field is required and cannot be empty'),
    postId: z.string(),
    parentId: z.string().nullable().optional(),
})