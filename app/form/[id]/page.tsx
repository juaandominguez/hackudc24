import { getFormById, getFormTypeById } from "@/lib/fetchUtils";

export default async function ({ params }: { params: { id: String } }) {
  const { id } = params;
  const data = await getFormById(id.toString());

  const dataName = await getFormTypeById(data.form_type_id.toString());

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="my-6">{data.title_field}</h1>
      <div>
        {data.form_fields?.map((field, index) => (
          <div className="my-3">
            <p className="">
              {
                dataName.form_fields.find(
                  (id) => id.field_id.toString() === field.field_id.toString()
                )?.field_name
              }
            </p>
            <p key={index}>{field.field_value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
