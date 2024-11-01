import { signUp } from "@/actions/sign-up"
import { Button } from "@/components/buttons/button"

export const SignUpForm = () => {
  // när vi submit är det action signUp som skickas?
  return <form action={signUp} className='flex w-full max-w-md flex-col gap-4'> 
    <input type="email" placeholder="email" name="email" required className="p-2 border-2 rounded-xl" />
    <input type="password" placeholder="password" name="password" required className="p-2 border-2 rounded-xl" />
    <Button variant="primary" type="submit">Join</Button>

  </form>
}
