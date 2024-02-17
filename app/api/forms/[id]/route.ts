import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });
  return supabase
    .from("form")
    .select("*")
    .eq("form_id", id)
    .then(({ data, error }) => {
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      } else {
        if (data.length === 0) {
          return NextResponse.json({ error: "No form found" }, { status: 404 });
        }
        return NextResponse.json(data[0]);
      }
    });
}
