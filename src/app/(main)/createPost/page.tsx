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

const CreatePost = () => {
  const {mutate, error, isPending} = useMutation({
    mutationFn: createPost,
    onError: (error) => toast.error(error.message)
  })

  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    // mode: "onBlur" 
  })
  
  return (
    <main className="main">
      <h1 className="mb-8 pl-2 text-2xl font-bold">Create post</h1>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full flex-col gap-4">
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
        <Button type="submit" variant="secondary">{isPending ? 'Uploading post..' : 'Post'}</Button>
      </form>
    </main>
  );
};

export default CreatePost
