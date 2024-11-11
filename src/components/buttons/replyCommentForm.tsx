'use client'
import { createComment } from "@/actions/create-comment";
import { commentSchema } from "@/actions/schemas"
import { Button } from "@/components/buttons/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


/* const ReplyCommentForm = ({ postId, parentId = null }: { postId: string; parentId?: string | null }) => { */
const ReplyCommentForm = ({ postId, parentId}: { postId: string; parentId: string; }) => {
    const {mutate} = useMutation({
        mutationFn: createComment, 
        onError: (error) => toast.error(error.message),
        onSuccess: () => reset(),
        //onSuccess:() => {reset(), toast.success('Your comment was updated!')}
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema), 
        defaultValues: {postId, parentId}, // parentId: parentId || null - Make sure to pass parentId or null for top-level comments
        // mode: "onBlur"
    })
    
    return (
        <form onSubmit={handleSubmit((data) => mutate(data))} className="flex w-full flex-col mb-8">
            <textarea 
                {...register('comment')} // change this one??
                placeholder="Add a reply"
                className="p-2 mb-4 md:mb-2 border rounded-2xl text-sm" 
                rows={1}          
            />
            <input 
                type="hidden" 
                {...register('parentId')} 
                value={parentId} // Need this input at all??
            />
            <div className="md:flex md:justify-between items-center">
                {errors.comment && <p className="ml-4 mb-4 text-xs text-center inline-flex text-red-500">{errors.comment.message}</p>}
                <Button className="w-full md:w-20 md:ml-auto" type="submit" variant="secondary">Reply</Button>
            </div>
        </form>
    )
}

export default ReplyCommentForm