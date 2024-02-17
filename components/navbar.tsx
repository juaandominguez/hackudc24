import React from 'react'
import LoggedAvatar from './avatars/logged-avatar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UnloggedAvatar from './avatars/unlogged-avatar'
const Navbar = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user }, error } = await supabase.auth.getUser()
    return (
        <nav className='flex justify-end mx-auto w-[50vw] mt-6'>
            {user ? <LoggedAvatar user={user} /> : <UnloggedAvatar />}
        </nav>
    )
}

export default Navbar