import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CustomCard from '@/components/custom-card'
import { Button } from '@/components/ui/button'

const Page = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    const { data: completedForm } = await supabase
        .from('form')
        .select('form_id, title_field')
        .eq('user_id', user?.id)
    if (!user) {
        return redirect('/')
    }
    if (!completedForm) {
        throw new Error('Failed to fetch data')
    }
    return (
        <main className="flex flex-col flex-wrap justify-center items-center max-w-[1200px] m-auto min-h-dvh">
            <h1 className='text-4xl font-semibold'>Your recent form completions</h1>
            <div className='mt-10 flex flex-row flex-wrap justify-center max-w-[1200px] mx-auto'>
                {completedForm?.length > 0 ?
                    completedForm?.map((form) => (
                        <Link href={`/forms/${form.form_id}`} key={form.form_id}>
                            <CustomCard name={form.title_field} />
                        </Link>
                    )) : (
                        <p className='text-2xl font-semibold'>You have no completions yet!</p>
                    )}
            </div>
            <Link href='/' className='mt-6'><Button>Go back to the main page</Button></Link>
        </main>
    )
}

export default Page