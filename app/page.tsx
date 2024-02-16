import Header from "@/components/header";
import CustomCheckbox from "@/components/inputs/checkbox";
import Main from "@/components/main";
import SkeletonSchemas from "@/components/skeleton-schemas";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<SkeletonSchemas />}>
        <Main />
      </Suspense>
    </>
  );
}
