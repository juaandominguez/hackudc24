import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CustomSelectProps {
    id: string
    name: string
    required: boolean
    readonly: boolean
    defaultValue: string
    options: string[]
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ id, name, required, readonly, defaultValue, options }) => {
    return (
        <Select required={required} disabled={readonly}>
            <SelectTrigger className="w-[180px]" id={`${id}`}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{name}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem value={option} key={option}>{option}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
