import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <main className='min-h-screen w-screen justify-center flex items-center flex-col'>
            <h1 className='text-5xl'>Form not found</h1>
            <Link href='/' className='mt-8'>
                <Button className='text-2xl py-9 px-16'>Home Screen</Button>
            </Link>
        </main>
    )
}

export default NotFound