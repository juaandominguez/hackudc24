import React from "react";
import { getAllFormTypes, getAllForms } from "@/lib/fetchUtils";

import Link from "next/link";
import CustomCard from "./custom-card";
const Main = async () => {
    const forms = await getAllFormTypes();
    const completedForm = await getAllForms();
    return (
        <>
            <h2 className="text-center mt-16 mb-4 text-4xl font-semibold">
                Form schemas
            </h2>
            <div className="flex flex-row flex-wrap justify-center max-w-[1200px] m-auto">
                {forms?.map((form) => (
                    <Link href={`/schemas/${form.form_type_id}`} key={form.form_type_id}>
                        <CustomCard name={form.form_type_name} />
                    </Link>
                ))}
            </div>
            <h2 className="text-center mt-16 mb-4 text-4xl font-semibold">
                Completed forms
            </h2>
            <div className="flex flex-row flex-wrap justify-center max-w-[1200px] m-auto">
                {completedForm?.map((form) => (
                    <Link href={`/forms/${form.form_id}`} key={form.form_id}>
                        <CustomCard name={form.title_field} />
                    </Link>
                ))}
            </div>
            </>
    );
};

export default Main;
