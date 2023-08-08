import queryData from "@/utils/querySearch";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";

interface Props {
  setSearchData: Dispatch<SetStateAction<Record<any,any> | undefined | null >>
}

const Search = ({ setSearchData }:Props) => {
  const [term, setTerm] = useState<string>("");

  const searchOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
  };

  const searchInit = async () => {
    const searchResults = await queryData(term);
    console.log(searchResults);
    setSearchData(searchResults);
  };

  return (
    <div className="search-box">
      <div className="search-box-wrapper">
        <input
          onKeyPress={(e) => {
            e.key === "Enter" && searchInit();
          }}
          onChange={searchOnChange}
          value={term}
          type="text"
        />
        <span onClick={searchInit}> <img src="img/icons/search.svg" alt="" /> </span>
      </div>
    </div>
  );
};

export default Search;
