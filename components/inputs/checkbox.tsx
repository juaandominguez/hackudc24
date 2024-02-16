import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'


interface CustomCheckboxProps {
    id: string
    name: string
    required: boolean
    readonly: boolean
    defaultValue: boolean
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    id, name, required, readonly, defaultValue
}) => {
    return (
        <div className='flex'><Checkbox id={`${id}`} required={required} name={name} aria-readonly={readonly} defaultChecked={defaultValue} />
            <Label className='ml-4'>{name}</Label>
        </div>
    )
}

export default CustomCheckbox