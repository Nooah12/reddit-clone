import React from 'react'
import Link from 'next/link'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='w-full flex justify-between p-8 mb-4'>
      <Link href='/' className='text-2xl font-bold'>
        reddit
      </Link>
      <Navbar />
    </header>
  )
}

export default Header