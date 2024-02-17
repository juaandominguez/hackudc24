import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = () => {
    return (
        <nav className='w-screen flex'>
            <Avatar>
                <AvatarFallback>J</AvatarFallback>
            </Avatar>
        </nav>
    )
}

export default Navbar