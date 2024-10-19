import React from 'react'
import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (
    <header className='flex justify-between p-8 mb-4'>
        <h1>Reddit</h1>
        <Navbar />
    </header>
  )
}

export default Header