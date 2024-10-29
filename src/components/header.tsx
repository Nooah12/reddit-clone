import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/buttons/button"
import { createClient } from '@/utils/supabase/server'
import { logOut } from "@/actions/log-out"
import { LogOutButton } from './buttons/logoutButton'
// import Navbar from './Navbar'

const Header = async () => {
  const supabase = createClient()
  const {data: {user}} = await supabase.auth.getUser()  // samma funktion som i middleware
  return (
    <header className='w-full flex justify-between p-8 mb-4'>
      <Link href='/' className='text-2xl font-bold'>
        reddit
      </Link>
      {user ? (
        <div className='flex gap-4'>
          <Link href='/createPost'>
            <Button variant='secondary'>+</Button>
            {/* <Button onClick={() => logOut()}>log out</Button> */} 
          </Link>
          <LogOutButton />
        </div>
          ) : (
            <Link href='/auth/log-in'>
              <Button variant="primary">Log In</Button>
            </Link>
          )}
    </header>
  )
}

export default Header