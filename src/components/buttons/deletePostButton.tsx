'use client' // onClick fungerar bara i client?

import React from 'react'
import { Button } from './button'
import { deletePost } from '@/actions/delete-post'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const DeletePostButton = ({postId}: {postId: string}) => {
    const {mutate} = useMutation({ 
        mutationFn: () => deletePost(postId), 
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success('Your post was deleted!'),
        onMutate: () => toast.loading('Deleting post..'),
        onSettled: () => toast.dismiss()
    })

  return (
    <Button onClick={() => mutate()} variant='primary'>Delete</Button>
  )
}

export default DeletePostButton