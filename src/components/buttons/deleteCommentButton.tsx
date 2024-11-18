'use client'

import React from 'react'
import { Button } from './button'
import { deleteComment } from '@/actions/delete-comment'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DeleteCommentButton = ({commentId}: {commentId: string}) => {
    const {mutate} = useMutation({ 
        mutationFn: () => deleteComment(commentId), 
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success('Your comment was deleted!'),
        onMutate: () => toast.loading('Deleting comment..'),
        onSettled: () => toast.dismiss()
    })

  return (
    <Button onClick={() => mutate()} variant='primary' className='w-10 h-10 !px-2 scale-75 flex items-center justify-center'> 
      <FontAwesomeIcon icon={faTrash} />  
    </Button>
  )
}

export default DeleteCommentButton