import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormById, getFormTypeById } from "@/lib/fetchUtils";
import Link from "next/link";

export default async function Page() {

  return (
    <div className="border border-red-500 flex flex-col justify-center items-center">
      <h1 className="my-6 text-5xl"></h1>
      <div className="flex flex-row flex-wrap w-full mx-auto items-center justify-center">
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
            <Card className="w-[350px] h-[120px] mx-8 my-4">
              <CardHeader>
                <CardTitle className="truncate w-[320px]">
                 iji
                </CardTitle>
                <CardDescription className="truncate w-[310px]"></CardDescription>
              </CardHeader>
            </Card>
          
      </div>
      <Link href="/" className="my-10 "> <Button className="text-2xl px-20 py-10">Home</Button></Link>
    </div>
  );
}

