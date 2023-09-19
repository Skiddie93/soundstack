import queryData from "@/utils/querySearch";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  setSearchData: Dispatch<SetStateAction<Record<any, any> | undefined>>;
}

const Search = ({ setSearchData }: Props) => {
  const [term, setTerm] = useState<string>("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query");

  const searchInit = async () => {
    const queryString = encodeURIComponent(searchTerm || "");
    const url = `https://api.spotify.com/v1/search?q=${queryString}&type=album&limit=12`;
    const searchResults = await queryData(url);
    setSearchData(searchResults);
  };

  useEffect(() => {
    if (searchTerm) {
      searchInit();
    }
  }, [searchTerm]);

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
          onKeyPress={(e) => {
            e.key === "Enter" && queryRouting();
          }}
          onChange={searchOnChange}
          value={term}
          type="text"
        />
        <span onClick={queryRouting}>
          {" "}
          <img src="img/icons/search.svg" alt="" />{" "}
        </span>
      </div>
    </div>
  );
};

export default Search;
