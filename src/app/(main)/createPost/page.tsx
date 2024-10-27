'use client'
import { Button } from "@/components/button";
import React, { useState } from "react";

const CreatePost = () => {
/*   const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Function to submit post goes here (e.g., API call)
    console.log({ title, content });
  };
 */
  return (
    <form /* onSubmit={handleSubmit} */ className="flex flex-col gap-4 p-4 w-screen mx-auto">
      <input
        type="text"
        //value={title}
        //onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Title"
        className="p-2 border rounded-2xl"
      />
      <textarea
        //value={content}
        //onChange={(e) => setContent(e.target.value)}
        required
        placeholder="Content..."
        className="p-2 border rounded-2xl"
        rows={5}
      />

      <Button type="submit" variant="secondary">
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost
