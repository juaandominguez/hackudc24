import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormTypeById } from "@/lib/fetchUtils";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getFormTypeById(id);
  console.log(data);
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
                <> <Label key={field.field_id} className="mt-4 mx-4">{field.field_description}</Label>
                  <Input
                    id={field.field_name}
                    type={field.field_type}
                    required={field.field_required}
                    readOnly={field.field_readonly}
                    defaultValue={field.field_default_value}
                  // validations={field.field_validations}
                  // dependentOn={field.field_dependent_on || null}
                  /></>
              ))
            ))
          }</>

      ) : (

        data.form_fields?.map((field) => (
          <div key={field.field_id}>
            <Label className="mt-4 mx-4">{field.field_description}</Label>
            <Input
              id={field.field_name}
              type={field.field_type}
              required={field.field_required}
              readOnly={field.field_readonly}
              defaultValue={field.field_default_value}
            // validations={field.field_validations}
            // dependentOn={field.field_dependent_on || null}
            />
          </div>
        ))
      )}

    </div>
  </main>;
};

export default page;
