// SPDX-License-Identifier: LICENSE.md

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { NextResponse } from "next/server";
import { Form, SpecificFormType } from "@/lib/types";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = params.get("page");

  if ((page && isNaN(parseInt(page))) || (page && parseInt(page) < 1)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }
  const supabase = createRouteHandlerClient<Database>({ cookies });

  if (!page) {
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

  return supabase
    .from("form")
    .select("*")
    .range(9 * (parseInt(page) - 1), 9 * parseInt(page) - 1)
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
  if (!form_type_id || !title_field || !form_fields) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return supabase
    .from("form")
    .insert({
      form_id,
      form_type_id,
      title_field,
      form_fields,
      user_id: user?.id,
    })
    .then(({ data, error }) => {
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      } else {
        return NextResponse.json(
          { message: "Form type created" },
          { status: 201 }
        );
      }
    });
}
