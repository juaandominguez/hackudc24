import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import { getAllForms } from '@/lib/fetchUtils'
import Link from 'next/link'
const Main = async () => {
    const forms = await getAllForms()
    return (
        <div className='flex flex-row flex-wrap justify-center'>
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
    )
}

export default Main