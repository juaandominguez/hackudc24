import InputSelector from "@/components/inputs/inputSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormById, getFormTypeById } from "@/lib/fetchUtils";
import { Form } from "@/lib/types";
import React from "react";

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { complete: string } }) => {
  const { complete } = searchParams;
  const { id } = params;
  let values: Form;
  if (complete) {
    values = await getFormById(complete);
  }
  const data = await getFormTypeById(id);
  return <main className="h-min-dvh flex items-center flex-col justify-center">
    <h1 className="mt-6 text-[5vw] font-bold">{data.form_type_name}</h1>
    <p className="mt-4 mx-4 font-semibold text-lg">{data.title_field.field_description}</p>
    <p className="mt-4 mx-4 text-lg">{data.form_type_description}</p>
    <div className="w-full max-w-[600px]">
      {/* ORDENAR */}
      {data.form_groups ? (
        <>
          {
            data.form_groups?.map((group) => (
              data.form_fields.filter((field) => field.field_group === group.group_id).map((field) => (
                <div key={field.field_id} className="flex flex-col items-start justify-center space-y-3">
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
                  // dependentOn={field.field_dependent_on || null}
                  /></div>
              ))
            ))
          }</>

      ) : (

        data.form_fields?.map((field) => (
          <div key={field.field_id}>
            <div key={field.field_id} className="flex flex-col items-start justify-center space-y-3">
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
              // dependentOn={field.field_dependent_on || null}
              /></div>
          </div>
        ))
      )}

    </div>
  </main>;
};

export default page;
