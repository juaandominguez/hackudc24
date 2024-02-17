// SPDX-License-Identifier: LICENSE.md

import Header from "@/components/header";
import Main from "@/components/main";
import SkeletonSchemas from "@/components/skeleton-schemas";
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
