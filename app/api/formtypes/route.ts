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
      .from("form_type")
      .select("form_type_id, form_type_name")
      .then(({ data, error }) => {
        if (error) {
          return NextResponse.json({ error }, { status: 500 });
        } else {
          return NextResponse.json(data);
        }
      });
  }

  return supabase
    .from("form_type")
    .select("form_type_id, form_type_name")
    .range(9 * (parseInt(page) - 1), 9 * parseInt(page))
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
  let data: SpecificFormType;
  try {
    data = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid Types" }, { status: 400 });
  }
  const {
    form_type_id,
    form_type_name,
    title_field,
    form_type_description,
    form_fields,
  } = data;
  if (!form_type_name || !title_field || !form_fields) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  return supabase
    .from("form_type")
    .insert({
      form_type_name,
      title_field,
      form_fields,
    })
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
      } else {
        return NextResponse.json(
          { message: "Form type created" },
          { status: 201 }
        );
      }
    });
}
