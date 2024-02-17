import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormById, getFormTypeById } from "@/lib/fetchUtils";
import Link from "next/link";

export default async function Page({ params }: { params: { id: String } }) {
  const { id } = params;
  const data = await getFormById(id.toString());

  const dataName = await getFormTypeById(data.form_type_id.toString());

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="my-6 text-5xl">{data.title_field}</h1>
      <div className="flex flex-row flex-wrap w-full mx-auto items-center justify-center">
        {data.form_fields?.map((field, index) =>
          field.field_value !== "" ? (
            <Card className="w-[350px] h-[120px] mx-8 my-4" key={field?.field_id}>
              <CardHeader>
                <CardTitle className="truncate w-[320px]">{
                  dataName.form_fields.find(
                    (id) => id?.field_id?.toString() === field?.field_id?.toString()
                  )?.field_name
                }</CardTitle>
                <CardDescription className="truncate w-[310px]">{field?.field_value}{(typeof field?.field_value === "boolean") ? (field?.field_value ? "Yes" : "No") : ""}</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <></>
          )
        )}
      </div>
      <Link href="/" className="my-10 "> <Button className="text-2xl px-20 py-10">Home</Button></Link>
    </div>
  );
}
