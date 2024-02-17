"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { postSchema } from '@/lib/fetchUtils'
import { MinusCircle, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const options = ["text", "number", "date", "select", "checkbox"]

const Page = () => {
    const [numberOfInputs, setNumberOfInputs] = useState(1)
    const [types, setTypes] = useState<any>(Array.from({ length: numberOfInputs }))
    const [names, setNames] = useState<any>(Array.from({ length: numberOfInputs }))
    const [requiredInputs, setRequiredInputs] = useState<any>(Array.from({ length: numberOfInputs }).map(() => false))
    const [readonlyInputs, setReadonlyInputs] = useState<any>(Array.from({ length: numberOfInputs }).map(() => false))

    const handleMinusClick = (index: number) => {
        if (numberOfInputs === 1) return;

        setNumberOfInputs(prevNumberOfInputs => prevNumberOfInputs - 1);

        setTypes((items: any[]) => {
            const newItems = items.filter((_, i) => i !== index);
            return newItems;
        });

        setNames((items: any[]) => {
            const newItems = items.filter((_, i) => i !== index);
            return newItems;
        });

        setRequiredInputs((items: any[]) => {
            const newItems = items.filter((_, i) => i !== index);
            return newItems;
        });

        setReadonlyInputs((items: any[]) => {
            const newItems = items.filter((_, i) => i !== index);
            return newItems;
        });
    };


    const handlePlusClick = () => {
        setNumberOfInputs((numberOfInputs) => numberOfInputs + 1)
    }

    const handleTypeChange = (index: number, str: string) => {
        setTypes((types: any) => {
            const newTypes = [...types]
            newTypes[index] = str
            return newTypes
        })
    }
    const handleNameChange = (index: number, str: string) => {
        setNames((names: any) => {
            const newNames = [...names]
            newNames[index] = str
            return newNames
        })
    }

    const handleRequiredChange = (index: number, bool: boolean) => {
        setRequiredInputs((requiredInputs: any) => {
            const newRequiredInputs = [...requiredInputs]
            newRequiredInputs[index] = !!bool
            return newRequiredInputs
        })
    }

    const handleReadonlyChange = (index: number, bool: boolean) => {
        setReadonlyInputs((readonlyInputs: any) => {
            const newReadonlyInputs = [...readonlyInputs]
            newReadonlyInputs[index] = !!bool
            return newReadonlyInputs
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            postSchema({
                form_type_name: e.target[0].value,
                title_field: { field_description: e.target[1].value },
                form_fields: types.map((type: string, index: number) => ({
                    field_type: type,
                    field_name: names[index],
                    field_required: requiredInputs[index],
                    field_readonly: readonlyInputs[index]
                }))
            })
            toast.success('Schema created successfully')
            setNumberOfInputs(1)
            setTypes(Array.from({ length: numberOfInputs }))
            setNames(Array.from({ length: numberOfInputs }))
            setRequiredInputs(Array.from({ length: numberOfInputs }).map(() => false))
            setReadonlyInputs(Array.from({ length: numberOfInputs }).map(() => false))
        }
        catch (e) {
            toast.error('Error creating schema')
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="h-min-dvh flex items-center flex-col justify-center max-w-[1200px] mx-auto space-y-10 mb-20">
            <h1 className="mt-6 text-[3vw] font-bold">Create new schema</h1>
            <Label htmlFor="schema-name">Schema name</Label>
            <Input id="schema-name" required />
            <Label htmlFor="schema-description">Schema description</Label>
            <Input id="schema-description" required />
            {Array.from({ length: numberOfInputs }).map((_, index) => (
                <section key={index} className='w-full flex flex-col space-y-6 bg-secondary/20 p-10'>
                    <div className='flex flex-row justify-between items-center'>
                        <Label htmlFor={`input-type-${index}`}>Input type</Label>
                        <div className='flex flex-row space-x-4'>
                            <MinusCircle className='hover:cursor-pointer' role='button'
                                onClick={() => handleMinusClick(index)} />
                            <PlusCircle className='hover:cursor-pointer' role='button'
                                onClick={handlePlusClick} />
                        </div>
                    </div>
                    <Select required
                        value={types[index]} onValueChange={(str) => handleTypeChange(index, str)}>
                        <SelectTrigger className="w-full" id={`input-type-${index}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select a type</SelectLabel>
                                {options.map((option) => (
                                    <SelectItem value={option} key={option}>{option}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Label htmlFor={`input-name-${index}`}>Input name</Label>
                    <Input required id={`input-name-${index}`} value={names[index]} onChange={(e) => handleNameChange(index, e.target.value)} />
                    <div className='flex flex-row space-x-2'>
                        <Label htmlFor="required" className='w-28'> Input is required</Label>
                        <Checkbox id="required" value={requiredInputs[index]} onCheckedChange={(e) => handleRequiredChange(index, !!e.valueOf())} />
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <Label htmlFor="readonly" className='w-28'> Input is readonly</Label>
                        <Checkbox id="readonly" checked={readonlyInputs[index]} onCheckedChange={(e) => handleReadonlyChange(index, !!e.valueOf())} />
                    </div>
                </section>
            ))}
            <Button type='submit' className='w-full'>Create Schema</Button>
        </form>
    )
}

export default Page