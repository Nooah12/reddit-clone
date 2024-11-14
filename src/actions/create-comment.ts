'use server'
import { createClient } from "@/utils/supabase/server";
import { commentSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createComment = async (data: z.infer<typeof commentSchema>) => {
    const { comment, postId, parentId } = commentSchema.parse(data);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw Error("Not authenticated");
    }

    await supabase
        .from("comments")
        .insert([{
            comment,
            post_id: postId,
            user_id: user.id,
            parent_id: parentId ?? null,
        }]);

    revalidatePath('/')
};


