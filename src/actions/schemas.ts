import { z } from "zod";

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'password must be at least 3 characters'),
    // username: z.string().min(3, 'must be at least 3 characters')
})