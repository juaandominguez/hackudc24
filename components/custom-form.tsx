"use client";
import { SpecificFormType } from "@/lib/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import InputSelector from "./inputs/inputSelector";
import { Button } from "./ui/button";
import { number } from "zod";
import { postForm } from "@/lib/fetchUtils";
import { title } from "process";

interface CustomFormProps {
  data: SpecificFormType;
}

const CustomForm: React.FC<CustomFormProps> = ({ data }) => {
  const [formValues, setFormValues] = useState<any[]>(
    Array.from({ length: data.form_fields.length })
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formFields = Object.entries(formValues)
      .filter(([_, value]) => value !== undefined) // Filter out undefined values
      .map(([index, value]) => ({
        field_id: parseInt(index), // Convert index to number and add 1 to get field_id
        field_value: value, // Set field_value to the value
      }));
    const query = {
      form_type_id: data.form_type_id,
      title_field: data.title_field.field_description,
      form_fields: formFields,
    };
    console.log(formFields);

    postForm(query);
  };

  const handleChange = (id: number, value: string) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const handleVisible = (id: number | undefined, value: string | undefined) => {
    if (!id || !value) return true;
    const elementValue = formValues[id];
    if (elementValue != value) {
      return false;
    } else true;
  };

  return (
    <form className="w-full max-w-[600px]" onSubmit={(e) => handleSubmit(e)}>
      {data.form_groups?.toSorted((a, b) => a.group_order - b.group_order) ? (
        <>
          {data.form_groups?.map((group: any) =>
            data.form_fields
              .filter((field: any) => field.field_group === group.group_id)
              .toSorted((a, b) => a.field_order - b.field_order)
              .map((field) => (
                <div
                  key={field.field_id}
                  className={`flex flex-col items-start justify-center space-y-3 ${
                    handleVisible(
                      field.field_dependent_on?.field_id,
                      field.field_dependent_on?.field_value
                    )
                      ? "flex"
                      : "hidden"
                  }`}
                >
                  <Label className="mt-4 mx-4">{field.field_description}</Label>
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
              ))
          )}
        </>
      ) : (
        data.form_fields
          ?.toSorted((a, b) => a.field_order - b.field_order)
          .map((field) => (
            <div key={field.field_id}>
              <div
                key={field.field_id}
                className={`flex flex-col items-start justify-center space-y-3 ${
                  handleVisible(
                    field.field_dependent_on?.field_id,
                    field.field_dependent_on?.field_value
                  )
                    ? "flex"
                    : "hidden"
                }`}
              >
                <Label className="mt-4 mx-4">{field.field_description}</Label>
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
