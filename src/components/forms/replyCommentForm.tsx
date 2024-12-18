'use client'
import { createComment } from "@/actions/create-comment";
import { commentSchema } from "@/actions/schemas"
import { Button } from "@/components/buttons/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots } from "@fortawesome/free-regular-svg-icons"
import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const ReplyCommentForm = ({ postId, parentId}: { postId: string; parentId: string; }) => {
    const [showReplyForm, setShowReplyForm] = useState(true);

    const {mutate} = useMutation({
        mutationFn: createComment, 
        onError: (error) => toast.error(error.message),
        onSuccess: () => reset(),
        //onSuccess:() => {reset(), toast.success('Your comment was updated!')}
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema), 
        defaultValues: {postId, parentId},
        // mode: "onBlur"
    })
    
    return (
        <div className="flex items-center gap-2 text-xs md:text-sm"> 
            <div className="w-full text-right">
                <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-gray-600 hover:text-gray-800 mb-1">
                    <FontAwesomeIcon icon={faCommentDots as IconProp} className="mr-1" />
                    Reply
                </button>
                <div className={`${!showReplyForm ? 'block' : 'hidden'}`}>
                    <form onSubmit={handleSubmit((data) => mutate(data))} className="mt-2 w-full flex flex-col relative">
                        <textarea 
                            {...register('comment')}
                            placeholder="Add a reply"
                            className="p-2 pr-20 rounded-2xl text-sm" 
                            rows={3}          
                        />
                        <input 
                            type="hidden" 
                            {...register('parentId')} 
                            value={parentId}
                        />
                        {/* <div className="md:flex md:justify-between items-center"> */}
                        <div className="absolute right-2 top-[75%] -translate-y-1/2">
                            <Button className="20" type="submit" variant="secondary">Reply</Button>
                        </div>
                        {errors.comment && <p className="absolute -bottom-0 left-0 ml-4 mb-6 md:mb-4 text-xs text-center inline-flex text-red-500">{errors.comment.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReplyCommentForm