'use client'
import { createComment } from "@/actions/create-comment";
import { commentSchema } from "@/actions/schemas"
import { Button } from "@/components/buttons/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const CreateComment = ({ postId }: { postId: string }) => {
    const {mutate} = useMutation({
        mutationFn: createComment, 
        onError: (error) => toast.error(error.message),
        onSuccess:() => reset()
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema), 
        defaultValues: {postId}
    })
    
    return (
        <form onSubmit={handleSubmit((data) => mutate(data))} className="flex w-full flex-col mb-8">
            <textarea 
                {...register('comment')}
                placeholder="Add a comment"
                className="p-2 mb-4 md:mb-2 border rounded-2xl text-sm h-10 transition-all duration-200 ease-in-out focus:h-20" 
                //rows={1}
            />
            <div className="md:flex md:justify-between items-center">
                {errors.comment && <p className="ml-4 mb-4 text-xs text-center inline-flex text-red-500">{errors.comment.message}</p>}
                <Button className="w-full md:w-20 md:ml-auto" type="submit" variant="secondary">Comment</Button>
            </div>
        </form>
    )
}

export default CreateComment