"use client";
import { useState } from "react";
import Search from "@/components/Search";

export default function Page() {
  const [searchData, setSearchData] = useState<null | undefined | Record<any,any>>(null);

  return (
    <>
      <Search setSearchData={setSearchData} />
    </>
  );
}
