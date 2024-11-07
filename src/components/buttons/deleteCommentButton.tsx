'use client'

import React from 'react'
import { Button } from './button'
import { deleteComment } from '@/actions/delete-comment'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const DeleteCommentButton = ({commentId}: {commentId: string}) => {
    const {mutate} = useMutation({ 
        mutationFn: () => deleteComment(commentId), 
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success('Your comment was deleted!'),
        onMutate: () => toast.loading('Deleting comment..'),
        onSettled: () => toast.dismiss()
    })

  return (
    <Button onClick={() => mutate()} variant='primary'>Delete</Button>
  )
}

export default DeleteCommentButton