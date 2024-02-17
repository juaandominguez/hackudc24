// SPDX-License-Identifier: LICENSE.md

import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonSchemas = () => {
    return (
        <div className='flex flex-col justify-center mx-auto items-center mt-5'>
            <Skeleton
                className="w-[320px] h-[50px] mt-6 mx-2"
            />
            <div className='flex flex-row flex-wrap justify-center max-w-[1200px] m-auto'>
                {Array.from({ length: 9 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="w-[350px] h-[100px] mt-6 mx-2"
                    />
                ))}
            </div>
        </div>
    )
}

export default SkeletonSchemas