"use client"
import { CustomSelect } from '@/components/inputs/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MinusCircle, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'


const options = ["text", "number", "date", "select", "checkbox"]

const Page = () => {
    const [numberOfInputs, setNumberOfImputs] = useState(1)
    const handleMinusClick = () => {
        if (numberOfInputs === 1) return
        setNumberOfImputs((numberOfInputs) => numberOfInputs - 1)
    }
    const handlePlusClick = () => {
        setNumberOfImputs((numberOfInputs) => numberOfInputs + 1)
    }
    return (
        <form className="h-min-dvh flex items-center flex-col justify-center max-w-[1200px] mx-auto space-y-10 mb-20">
            <h1 className="mt-6 text-[3vw] font-bold">Create new schema</h1>
            <Label htmlFor="schema-name">Schema name</Label>
            <Input id="schema-name" />
            <Label htmlFor="schema-description">Schema description</Label>
            <Input id="schema-description" />
            {Array.from({ length: numberOfInputs }).map((_, index) => (
                <section key={index} className='w-full flex flex-col space-y-6 bg-secondary/20 p-10'>
                    <div className='flex flex-row justify-between items-center'>
                        <Label htmlFor={`input-type-${index}`}>Input type</Label>
                        <div className='flex flex-row space-x-4'>
                            <MinusCircle className='hover:cursor-pointer' role='button'
                                onClick={handleMinusClick} />
                            <PlusCircle className='hover:cursor-pointer' role='button'
                                onClick={handlePlusClick} />
                        </div>
                    </div>
                    <Select>
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
                    <Input id={`input-name-${index}`} />
                    <div className='flex flex-row space-x-2'>
                        <Label htmlFor="required" className='w-28'> Input is required</Label>
                        <Checkbox id="required" />
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <Label htmlFor="readonly" className='w-28'> Input is readonly</Label>
                        <Checkbox id="readonly" />
                    </div>
                </section>
            ))}
            <Button type='submit' className='w-full'>Create Schema</Button>
        </form>
    )
}

export default Page