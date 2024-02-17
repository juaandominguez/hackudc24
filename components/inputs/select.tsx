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
    id: number
    name: string
    required: boolean
    readonly: boolean
    options: string[]
    value: string
    setValue: (id: number, value: string) => void
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ id, name, required, readonly, options, value, setValue }) => {
    return (
        <Select required={required} disabled={readonly} onValueChange={(e) => setValue(id, e)}
            value={value}>
            <SelectTrigger className="w-full" id={`${id}`}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{name}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem value={option} key={option} defaultChecked={option === value}>{option}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
