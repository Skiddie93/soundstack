import queryData from "@/utils/querySearch";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setSearchData: Dispatch<SetStateAction<null>>;
}

const Search = ({ setSearchData }) => {
  const [term, setTerm] = useState<string>("");

  const searchOnChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
  };

  const searchInit = async () => {
    const searchResults = await queryData(term);
    console.log(searchResults);
    setSearchData(searchResults);
  };

  return (
    <div>
      <input onChange={searchOnChange} value={term} type="text" />
      <button onClick={searchInit}>Click</button>
    </div>
  );
};

export default Search;
