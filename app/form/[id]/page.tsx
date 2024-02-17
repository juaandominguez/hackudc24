import { getFormById, getFormTypeById } from "@/lib/fetchUtils";

export default async function ({ params }: { params: { id: String } }) {
  const { id } = params;
  const data = await getFormById(id.toString());

  const dataName = await getFormTypeById(data.form_type_id.toString());

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="my-6 text-5xl">{data.title_field}</h1>
      <div>
        {data.form_fields?.map((field, index) =>
          field.field_value !== "" ? (
            <div className="bg-gray-100 rounded-md p-4 my-2">
              <p className="font-semibold text-gray-800">
                {
                  dataName.form_fields.find(
                    (id) => id.field_id.toString() === field.field_id.toString()
                  )?.field_name
                }
              </p>
              <div key={index} className="text-gray-600">
                {
                    typeof field.field_value === "boolean" ? (
                        field.field_value ? (
                            <div>Si</div>
                        ) : (
                            <div>No</div>
                        )
                    ) : (
                        <div>{field.field_value.toString()}</div>
                    )
                }
              </div>
            </div>
          ) : ( 
            <></>
          )
        )}
      </div>
    </div>
  );
}
