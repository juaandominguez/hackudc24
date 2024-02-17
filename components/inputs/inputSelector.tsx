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
    defaultValue: string
    pattern?: string
    options?: string[]
    min_length?: number;
    value: string
    setValue: (id: number, value: string) => void
}

const InputSelector: React.FC<InputSelectorProps> = ({ type, id, name, readonly, required, defaultValue, pattern = "^[A-Za-z0-9_]+$", options = [], min_length = 0, value, setValue }) => {
    if (type === "checkbox") {
        return <CustomCheckbox id={id} name={name} required={required} readonly={readonly} defaultValue={!!defaultValue} value={value} setValue={setValue} />
    }
    else if (type === "select") {
        return <CustomSelect id={id} name={name} required={required} readonly={readonly} defaultValue={defaultValue} options={options} value={value} setValue={setValue} />
    }
    else if (type === "date") {
        return <DatePicker />
    }
    else {
        return <Input id={`${id}`} name={name} readOnly={readonly} required={required} defaultValue={defaultValue} minLength={min_length} pattern={pattern} value={value} onChange={(e) => setValue(id, e.target.value)} />
    }
}

export default InputSelector