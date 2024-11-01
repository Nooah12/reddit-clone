import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/buttons/button"
import { createClient } from '@/utils/supabase/server'
import { logOut } from "@/actions/log-out"
import { LogOutButton } from './buttons/logoutButton'
import { SearchBar } from './searchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';


// import Navbar from './Navbar'

const Header = async () => {
  const supabase = createClient()
  const {data: {user}} = await supabase.auth.getUser()  // samma funktion som i middleware
  return (
    <header className='w-full flex justify-between items-center px-4 py-4 gap-4 md:px-20'>
      <Link href='/' className='text-2xl font-bold'>
      <FontAwesomeIcon icon={faReddit} style={{color: "#f53629",}} />
        <span className='ml-1'>reddit</span>
      </Link>
      <SearchBar />
      {user ? (
        <div className='flex gap-4 items-center'> 
          <Link href='/createPost'>
            <Button variant='secondary'>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
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