'use client'
import { createPost } from "@/actions/create-post";
import { postSchema } from "@/actions/schemas";
import { Button } from "@/components/buttons/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createPostSchema = postSchema
  .omit({ image: true })
  .extend({ image: z.instanceof(FileList)
  .optional() })

const CreatePost = () => {
  const {mutate, error, isPending} = useMutation({
    mutationFn: createPost,
    onError: (error) => toast.error(error.message)
  })

  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    // mode: "onBlur" 
  })
  
  return (
    <main className="main">
      <h1 className="mb-8 pl-2 text-2xl font-bold">Create post</h1>
      <form onSubmit={handleSubmit((values) => {
        const imageForm = new FormData()
        if (values.image && values.image?.length === 1) {
          imageForm.append('image', values.image[0])
        }
        mutate({
          title: values.title,
          content: values.content,
          image: imageForm
        })
      })} className="flex w-full flex-col gap-4">
        <input
          {...register('title')}
          type="text"
          // error={errors.title} // funkar ej?
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
        <input {...register('image')} type="file" placeholder="image" /> 
        <Button type="submit" variant="secondary">{isPending ? 'Uploading post..' : 'Post'}</Button>
      </form>
    </main>
  );
};

export default CreatePost
