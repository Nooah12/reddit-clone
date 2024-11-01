'use client'
import { editPost } from "@/actions/edit-post"
import { postSchema } from "@/actions/schemas"
import { Button } from "@/components/buttons/button"
import { type Tables } from "@/utils/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const EditPostForm = ({defaultValues, postId}: {defaultValues: Pick<Tables<'posts'>, 'title' | 'content'>, postId: string}) => { // går in i vår post-table och bara ta title samt content, Pick gör | and ist för or ?
    const {mutate, isPending} = useMutation({
        mutationFn: editPost,
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success('Your post was updated!')
    })

    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema), 
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined
        }
    })

    return (
        <form onSubmit={handleSubmit((data) => mutate({data, postId}))} className="flex w-full flex-col gap-4"> {/* ist för values kan vi köra data direkt */}
           <input
                {...register('title')}
                // error={errors.title} // funkar ej?
                type="text"
                //required
                placeholder="Title"
                className="p-2 border rounded-2xl"
           />
           {errors.title && <p className="text-red-500">{errors.title.message}</p>}
           <textarea
                {...register('content')}
                // error={errors.content} // funkar ej?
                //required // behövs?
                placeholder="Content..."
                className="p-2 border rounded-2xl"
                rows={5}
            />
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            <Button type="submit">{isPending ? 'saving changes..' : 'saved changes'}</Button>
            {/* {error && <p className="text-red-500">{error.message}</p>} */} {/* error variant 1 */}
      </form>
    )
}