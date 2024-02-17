// SPDX-License-Identifier: LICENSE.md

import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'

interface CustomCardProps {
    name: string
}

const CustomCard: React.FC<CustomCardProps> = ({
    name
}) => {
    return (
        <Card
            className="w-[350px] h-[100px] mt-6 mx-2 hover:cursor-pointer hover:bg-secondary/70 transition-all duration-300 ease-in-out"
        >
            <CardHeader className="flex items-center justify-center w-full h-full">
                <CardTitle>{name}</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default CustomCard