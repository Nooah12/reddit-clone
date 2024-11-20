'use client'
import { createComment } from "@/actions/create-comment";
import { commentSchema } from "@/actions/schemas"
import { Button } from "@/components/buttons/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const CreateCommentForm = ({ postId }: { postId: string; }) => {
    const {mutate} = useMutation({
        mutationFn: createComment, 
        onError: (error) => toast.error(error.message),
        onSuccess: () => reset(),
        //onSuccess:() => {reset(), toast.success('Your comment was updated!')}
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema), 
        defaultValues: {postId},
        // mode: "onBlur"
    })
    
    return (
        <form onSubmit={handleSubmit((data) => mutate(data))} className="flex w-full flex-col mb-4 relative">
            <textarea 
                {...register('comment')}
                placeholder="Add a comment"
                className="p-2 pr-24 mb-4 md:mb-2 border rounded-2xl text-sm" 
                rows={4}
            />
            {/* <div className="md:flex md:justify-between items-center"> */}
            <div className="absolute right-2 top-[67%] md:top-[72%] -translate-y-1/2">
                <Button className="w-20" type="submit" variant="secondary">Comment</Button>
            </div>
            {errors.comment && <p className="absolute -bottom-3 left-0 ml-4 text-xs text-center inline-flex text-red-500">{errors.comment.message}</p>}
        </form>
    )
}

export default CreateCommentForm