import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'


interface CustomCheckboxProps {
    id: number
    name: string
    required: boolean
    readonly: boolean
    defaultValue: boolean
    value: string
    setValue: (id: number, value: string) => void
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    id, name, required, readonly, defaultValue, value, setValue
}) => {
    return (
        <div className='flex'><Checkbox id={`${id}`} required={required} name={name} aria-readonly={readonly} defaultChecked={defaultValue} value={value} onChange={(e) => setValue(id, e.currentTarget.value)} />
            <Label className='ml-4'>{name}</Label>
        </div>
    )
}

export default CustomCheckbox