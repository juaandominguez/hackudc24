import React from 'react'
import { Input } from '../ui/input';
import { DatePicker } from '../ui/datePicker';
import { CustomSelect } from './select';
import CustomCheckbox from './checkbox';

interface InputSelectorProps {
    type: "text" | "number" | "date" | "select" | "checkbox";
    id: number
    name: string
    required: boolean
    readonly: boolean
    pattern?: string
    options?: string[]
    min_length?: number;
    value: string
    setValue: (id: number, value: string) => void
    placeholder?: string
}

const InputSelector: React.FC<InputSelectorProps> = ({ type, id, name, readonly, required, pattern = "^[A-Za-z0-9_]+$", options = [], min_length = 0, value, setValue, placeholder = "" }) => {
    if (type === "checkbox") {
        return <CustomCheckbox id={id} name={name} required={required} readonly={readonly} value={value} setValue={setValue} />
    }
    else if (type === "select") {
        return <CustomSelect id={id} name={name} required={required} readonly={readonly} options={options} value={value} setValue={setValue} placeholder={placeholder} />
    }
    else if (type === "date") {
        return <DatePicker id={id} value={value} setValue={setValue} />
    }
    else {
        return <Input id={`${id}`} name={name} readOnly={readonly} required={required} minLength={min_length} pattern={pattern} value={value} onChange={(e) => setValue(id, e.target.value)} maxLength={500} placeholder={placeholder} />
    }
}

export default InputSelector