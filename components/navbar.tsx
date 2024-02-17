import React from 'react'
import LoggedAvatar from './avatars/logged-avatar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UnloggedAvatar from './avatars/unlogged-avatar'
import Link from 'next/link'
import { Button } from './ui/button'
const Navbar = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user }, error } = await supabase.auth.getUser()
    return (
        <nav className='flex justify-between md:mx-auto md:w-[50vw] mt-6 items-center mx-14'>
            <Link href="/newschema">
                <Button variant={"secondary"}>Create New Schema</Button>
            </Link>
            {user ? <LoggedAvatar user={user} /> : <UnloggedAvatar />}
        </nav>
    )
}

export default Navbar