// SPDX-License-Identifier: LICENSE.md

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  return supabase
    .from("form_type")
    .select("*")
    .eq("form_type_id", id)
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      } else {
        if (data.length === 0) {
          return NextResponse.json(
            { error: "No form type found" },
            { status: 404 }
          );
        }
        return NextResponse.json(data[0]);
      }
    });
}
