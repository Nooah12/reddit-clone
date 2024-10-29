'use client'
import { Button } from "@/components/button";
import React, { useState } from "react";

const CreatePost = () => {
  return (
    <form /* onSubmit={handleSubmit} */ className="flex flex-col gap-4 p-4 w-screen mx-auto">
      <input
        type="text"
        required
        placeholder="Title"
        className="p-2 border rounded-2xl"
      />
      <textarea
        required
        placeholder="Content..."
        className="p-2 border rounded-2xl"
        rows={5}
      />
      <Button type="submit" variant="secondary">Create Post</Button>
    </form>
  );
};

export default CreatePost
