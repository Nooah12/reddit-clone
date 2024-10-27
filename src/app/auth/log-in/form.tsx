'use client'
import logIn from "@/actions/log-in"
import { logInSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RedditButton } from "@/components/button";

export const LogInForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: logIn,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema)
  });

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full max-w-md flex-col gap-4">
      <input {...register('email')} placeholder="Email" className="p-2 border-2 rounded-xl" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} placeholder="Password" type="password" className="p-2 border-2 rounded-xl" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <RedditButton variant="primary" type="submit">{isPending ? 'Logging in...' : 'Login'}</RedditButton>
      
      {error && <p>{error.message}</p>}
    </form>
  );
};