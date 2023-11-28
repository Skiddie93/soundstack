"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import onClickEnter from "@/utils/onClickEnter";

const Search = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  const [term, setTerm] = useState<string>(searchTerm || "");
  const router = useRouter();

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
  };

  const queryRouting = () => {
    const temrEncoded = encodeURI(term);
    router.push(`/search?query=${temrEncoded}`);
  };
  return (
    <div className="search-box">
      <div className="search-box-wrapper">
        <input
          onKeyPress={(e) => onClickEnter(e, () => queryRouting())}
          onChange={searchOnChange}
          value={term}
          type="text"
        />
        <span onClick={queryRouting}>
          {" "}
          <img src="/img/icons/search.svg" alt="" />{" "}
        </span>
      </div>
    </div>
  );
};

export default Search;
