"use client";
import { useState } from "react";
import Search from "@/components/Search";

export default function Page() {
  const [searchData, setSearchData] = useState<undefined | Record<any, any>>(
    undefined
  );

  return (
    <>
      <Search setSearchData={setSearchData} />
    </>
  );
}
