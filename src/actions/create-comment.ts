'use server'

import { createClient } from "@/utils/supabase/server"
import { postSchema } from "./schemas"
import { z } from "zod"

export const createComment = async (data: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(data)
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) {
        throw Error('Not authenticated')
    }

    await supabase 
}