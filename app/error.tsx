// SPDX-License-Identifier: LICENSE.md

"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Error = () => {
    return (
        <main className='min-h-dvh w-screen flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold text-center'>Internal error</h1>
            <Link href='/' className='mt-8'>
                <Button className='text-2xl py-9 px-16'>Home Screen</Button>
            </Link>
        </main>
    )
}

export default Error