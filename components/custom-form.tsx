// SPDX-License-Identifier: LICENSE.md

"use client";
import { SpecificFormType } from "@/lib/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import InputSelector from "./inputs/inputSelector";
import { Button } from "./ui/button";
import { postForm } from "@/lib/fetchUtils";
import { toast } from "sonner"


interface CustomFormProps {
    data: SpecificFormType;
}

const CustomForm: React.FC<CustomFormProps> = ({ data }) => {
    const [formValues, setFormValues] = useState<any[]>(
        Array.from({ length: data?.form_fields?.length })
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formFields = Object.entries(formValues)
            .filter(([_, value]) => value !== undefined)
            .map(([index, value]) => ({
                field_id: parseInt(index),
                field_value: value,
            }));
        const query = {
            form_type_id: data?.form_type_id,
            title_field: data?.title_field.field_description,
            form_fields: formFields,
        };
        try {
            postForm(query);
            toast.success("Form submitted successfully");
            setFormValues(Array.from({ length: data?.form_fields.length }));
        }
        catch (error) {
            toast.error("Error submitting form");
        }

    };

    const handleChange = (id: number, value: string) => {
        setFormValues({ ...formValues, [id]: value });
    };

    const handleVisible = (id: number | undefined, value: string | undefined) => {
        if (!id || !value) return true;
        const elementValue = formValues[id];
        if (elementValue != value) {
            return false;
        } else return true;
    };

    return (
        <form className="w-full max-w-[600px]" onSubmit={(e) => handleSubmit(e)}>
            {data?.form_groups?.toSorted((a, b) => a.group_order - b.group_order) ? (
                <>
                    {data?.form_groups?.map((group: any) =>
                        data?.form_fields
                            .filter((field: any) => field.field_group === group.group_id)
                            .toSorted((a, b) => a.field_order - b.field_order)
                            .map((field) => (
                                <div
                                    key={field.field_id}
                                    className={`flex flex-col items-start justify-center space-y-3 ${handleVisible(
                                        field.field_dependent_on?.field_id,
                                        field.field_dependent_on?.field_value
                                    )
                                        ? "flex"
                                        : "hidden"
                                        }`}
                                >
                                    <Label className="mt-4 mx-4">{field.field_name}</Label>
                                    <InputSelector
                                        id={field.field_id}
                                        type={field.field_type}
                                        required={
                                            field.field_required &&
                                            (handleVisible(
                                                field.field_dependent_on?.field_id,
                                                field.field_dependent_on?.field_value
                                            ) as boolean)
                                        }
                                        readonly={field.field_readonly}
                                        pattern={field?.field_validations?.format}
                                        name={field.field_name}
                                        options={field?.field_validations?.options}
                                        placeholder={field?.field_description}
                                        value={formValues[field.field_id] || ""}
                                        setValue={handleChange}
                                    />
                                </div>
                            ))
                    )}
                </>
            ) : (
                data?.form_fields
                    ?.toSorted((a, b) => a.field_order - b.field_order)
                    .map((field) => (
                        <div key={field.field_id}>
                            <div
                                className={`flex flex-col items-start justify-center space-y-3 ${handleVisible(
                                    field.field_dependent_on?.field_id,
                                    field.field_dependent_on?.field_value
                                )
                                    ? "flex"
                                    : "hidden"
                                    }`}
                            >
                                <Label className="mt-4 mx-4">{field.field_name}</Label>
                                <InputSelector
                                    id={field.field_id}
                                    type={field.field_type}
                                    required={
                                        field.field_required &&
                                        (handleVisible(
                                            field.field_dependent_on?.field_id,
                                            field.field_dependent_on?.field_value
                                        ) as boolean)
                                    }
                                    readonly={field.field_readonly}
                                    pattern={field?.field_validations?.format}
                                    name={field.field_name}
                                    options={field?.field_validations?.options}
                                    value={formValues[field.field_id] || ""}
                                    setValue={handleChange}
                                />
                            </div>
                        </div>
                    ))
            )}
            <Button className="my-10 w-full" type="submit">
                Submit form
            </Button>
        </form>
    );
};

export default CustomForm;
