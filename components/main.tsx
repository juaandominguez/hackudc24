import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import { getAllFormTypes } from '@/lib/fetchUtils'
import Link from 'next/link'
const Main = async () => {
    const forms = await getAllFormTypes()
    return (
        <>
            <h2 className='text-center mt-16 mb-4 text-4xl font-semibold'>Form schemas</h2>
            <div className='flex flex-row flex-wrap justify-center max-w-[1200px] m-auto'>
                {forms?.map((form) => (
                    <Link href={`/form/${form.form_type_id}`} key={form.form_type_id}>
                        <Card
                            className="w-[350px] h-[100px] mt-6 mx-2 hover:cursor-pointer" key={form.form_type_id}>
                            <CardHeader>
                                <CardTitle>{form.form_type_name}</CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
            <h2 className='text-center mt-16 mb-4 text-4xl font-semibold'>Completed forms</h2>

        </>
    )
}

export default Main