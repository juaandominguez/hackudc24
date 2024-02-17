"use client"
import { SpecificFormType } from '@/lib/types'
import React from 'react'
import { Label } from './ui/label'
import InputSelector from './inputs/inputSelector'
import { Button } from './ui/button'
import { number } from 'zod'

interface CustomFormProps {
    data: SpecificFormType
}

const CustomForm: React.FC<CustomFormProps> = ({ data }) => {


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);
    }

    /*const handleVisible = (id: number | undefined, value: string | undefined) => {
        if (!id || !value) return;
        const element = document.getElementById(id.toString());
        if (element?.nodeValue == value) {
            return "hidden"
        }
        else "flex"
    }
*/

    return (
        <form className="w-full max-w-[600px]" onSubmit={(e) => handleSubmit(e)}>
            {data.form_groups?.toSorted((a, b) => a.group_order - b.group_order) ? (
                <>
                    {
                        data.form_groups?.map((group: any) => (
                            data.form_fields.filter((field: any) => field.field_group === group.group_id).toSorted((a, b) => a.field_order - b.field_order).map((field) => (
                                <div key={field.field_id} className={`flex flex-col items-start justify-center space-y-3 `}>
                                    <Label className="mt-4 mx-4">{field.field_description}</Label>
                                    <InputSelector
                                        id={field.field_name}
                                        type={field.field_type}
                                        required={field.field_required}
                                        readonly={field.field_readonly}
                                        defaultValue={field.field_default_value}
                                        pattern={field?.field_validations?.format}
                                        name={field.field_name}
                                        options={field?.field_validations?.options}
                                    /></div>
                            ))
                        ))
                    }</>

            ) : (

                data.form_fields?.toSorted((a, b) => a.field_order - b.field_order).map((field) => (
                    <div key={field.field_id}>
                        <div key={field.field_id} className={`flex flex-col items-start justify-center space-y-3 `}>
                            <Label className="mt-4 mx-4">{field.field_description}</Label>
                            <InputSelector
                                id={field.field_name}
                                type={field.field_type}
                                required={field.field_required}
                                readonly={field.field_readonly}
                                defaultValue={field.field_default_value}
                                pattern={field?.field_validations?.format}
                                name={field.field_name}
                                options={field?.field_validations?.options}
                            /></div>
                    </div>
                ))
            )}
            <Button className="my-10 w-full" type="submit">Submit form</Button>
        </form>
    )
}

export default CustomForm