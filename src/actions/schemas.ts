import { z } from "zod";

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    // username: z.string().min(3, 'must be at least 3 characters')
})

export const postSchema = z.object({
    title: z.string().min(3, 'title must be at least 3 characters'),
    content: z.string().min(1), // .optional() ifall den får va null, på img t.ex kanske
    image: z.instanceof(FormData).optional(),
  })

export const commentSchema = z.object({
    comment: z.string().min(1, 'This field is required and cannot be empty'),
    postId: z.string(),
    /* parentId: z.string().min(1, 'This field is required!'), */ 
    parentId: z.string().nullable().optional(), // Allow null or undefined for top-level comments
})