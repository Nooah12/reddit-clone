'use client'
import { createPost } from "@/actions/create-post";
import { createPostSchema } from "@/actions/schemas";
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

  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema)
  })
  
  return (
    <main className="main">
      <h1 className="mb-8 pl-2 text-2xl font-bold">Create post</h1>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full flex-col gap-4">
        <input
          {...register('title')}
          error={errors.title} // hur fixar jag?
          type="text"
          required
          placeholder="Title"
          className="p-2 border rounded-2xl"
        />
        <textarea
          {...register('content')}
          error={errors.content} // hur fixar jag?
          required
          placeholder="Content..."
          className="p-2 border rounded-2xl"
          rows={5}
        />
        <Button type="submit" variant="secondary">Create Post</Button>
      </form>
    </main>
  );
};

export default CreatePost
