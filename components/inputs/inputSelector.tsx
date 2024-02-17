import React from 'react'
import { Input } from '../ui/input';
import { DatePicker } from '../ui/datePicker';
import { CustomSelect } from './select';
import CustomCheckbox from './checkbox';

interface InputSelectorProps {
    type: "text" | "number" | "date" | "selection" | "checkbox";
    id: string
    name: string
    required: boolean
    readonly: boolean
    defaultValue: string
    pattern?: string
    options?: string[]
    min_length?: number;
}

const InputSelector: React.FC<InputSelectorProps> = ({ type, id, name, readonly, required, defaultValue, pattern = "", options = [], min_length = 0 }) => {
    if (type === "checkbox") {
        return <CustomCheckbox id={id} name={name} required={required} readonly={readonly} defaultValue={!!defaultValue} />
    }
    else if (type === "selection") {
        return <CustomSelect id={id} name={name} required={required} readonly={readonly} defaultValue={defaultValue} options={options} />
    }
    else if (type === "date") {
        return <DatePicker />
    }
    else {
        return <Input id={`${id}`} name={name} readOnly={readonly} required={required} defaultValue={defaultValue} minLength={min_length} maxLength={max_length} />
        //PATTERN
    }
}

export default InputSelector