import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  return supabase
    .from("form")
    .select("*")
    .eq("form_id", id)
    .then(({ data, error }) => {
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      } else {
        return NextResponse.json(data);
      }
    });
}
