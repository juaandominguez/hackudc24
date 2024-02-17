import CustomForm from "@/components/custom-form";
import InputSelector from "@/components/inputs/inputSelector";
import { Button } from "@/components/ui/button";
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
    <p className="mt-4 mx-4 font-semibold text-xl">{data.title_field?.field_description}</p>
    <p className="mt-2 mb-4 mx-4 text-lg">{data.form_type_description}</p>
    <CustomForm data={data} />
  </main>;
};

export default page;
