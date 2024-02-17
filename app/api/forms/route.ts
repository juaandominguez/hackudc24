import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { NextResponse } from "next/server";
import { Form, SpecificFormType } from "@/lib/types";
export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  return supabase
    .from("form")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      } else {
        return NextResponse.json(data);
      }
    });
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  let data: Form;
  try {
    data = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid Types" }, { status: 400 });
  }
  const { form_id, form_type_id, title_field, form_fields } = data;
  if (!form_id || !form_type_id || !title_field || !form_fields) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  return supabase
    .from("form")
    .insert({
      form_id,
      form_type_id,
      title_field,
      form_fields,
    })
    .then(({ data, error }) => {
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      } else {
        console.log(data);
        return NextResponse.json(
          { message: "Form type created" },
          { status: 201 }
        );
      }
    });
}
