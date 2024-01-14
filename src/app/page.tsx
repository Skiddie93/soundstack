"use client";
import EditListResults from "@/components/EditListResults";
import Player from "@/components/Player";
import Select from "@/components/Select";
import { useEffect, useState } from "react";

const selectData = [
  {
    id: "2023",
    value: "2023",
  },
  {
    id: "2022",
    value: "2022",
  },
  {
    id: "2021",
    value: "2021",
  },
  {
    id: "2020",
    value: "2020",
  },
  {
    id: "2019",
    value: "2019",
  },
  {
    id: "2018",
    value: "2018",
  },
  {
    id: "2017",
    value: "2017",
  },
  {
    id: "2016",
    value: "2016",
  },
  {
    id: "2015",
    value: "2015",
  },
  {
    id: "2014",
    value: "2014",
  },
  {
    id: "2013",
    value: "2013",
  },
  {
    id: "2012",
    value: "2012",
  },
  {
    id: "2011",
    value: "2011",
  },
  {
    id: "2010",
    value: "2010",
  },
  {
    id: "2009",
    value: "2009",
  },
  {
    id: "2008",
    value: "2008",
  },
  {
    id: "2007",
    value: "2007",
  },
  {
    id: "2006",
    value: "2006",
  },
  {
    id: "2005",
    value: "2005",
  },
  {
    id: "2004",
    value: "2004",
  },
  {
    id: "2003",
    value: "2003",
  },
  {
    id: "2002",
    value: "2002",
  },
  {
    id: "2001",
    value: "2001",
  },
  {
    id: "2000",
    value: "2000",
  },
  {
    id: "1999",
    value: "1999",
  },
  {
    id: "1998",
    value: "1998",
  },
  {
    id: "1997",
    value: "1997",
  },
  {
    id: "1996",
    value: "1996",
  },
  {
    id: "1995",
    value: "1995",
  },
  {
    id: "1994",
    value: "1994",
  },
  {
    id: "1993",
    value: "1993",
  },
  {
    id: "1992",
    value: "1992",
  },
  {
    id: "1991",
    value: "1991",
  },
  {
    id: "1990",
    value: "1990",
  },
  {
    id: "1989",
    value: "1989",
  },
  {
    id: "1988",
    value: "1988",
  },
  {
    id: "1987",
    value: "1987",
  },
  {
    id: "1986",
    value: "1986",
  },
  {
    id: "1985",
    value: "1985",
  },
  {
    id: "1984",
    value: "1984",
  },
  {
    id: "1983",
    value: "1983",
  },
  {
    id: "1982",
    value: "1982",
  },
  {
    id: "1981",
    value: "1981",
  },
  {
    id: "1980",
    value: "1980",
  },
  {
    id: "1979",
    value: "1979",
  },
  {
    id: "1978",
    value: "1978",
  },
  {
    id: "1977",
    value: "1977",
  },
  {
    id: "1976",
    value: "1976",
  },
  {
    id: "1975",
    value: "1975",
  },
  {
    id: "1974",
    value: "1974",
  },
  {
    id: "1973",
    value: "1973",
  },
  {
    id: "1972",
    value: "1972",
  },
  {
    id: "1971",
    value: "1971",
  },
  {
    id: "1970",
    value: "1970",
  },
  {
    id: "1969",
    value: "1969",
  },
  {
    id: "1968",
    value: "1968",
  },
  {
    id: "1967",
    value: "1967",
  },
  {
    id: "1966",
    value: "1966",
  },
  {
    id: "1965",
    value: "1965",
  },
  {
    id: "1964",
    value: "1964",
  },
  {
    id: "1963",
    value: "1963",
  },
  {
    id: "1962",
    value: "1962",
  },
  {
    id: "1961",
    value: "1961",
  },
  {
    id: "1960",
    value: "1960",
  },
  {
    id: "1959",
    value: "1959",
  },
  {
    id: "1958",
    value: "1958",
  },
  {
    id: "1957",
    value: "1957",
  },
  {
    id: "1956",
    value: "1956",
  },
  {
    id: "1955",
    value: "1955",
  },
  {
    id: "1954",
    value: "1954",
  },
  {
    id: "1953",
    value: "1953",
  },
  {
    id: "1952",
    value: "1952",
  },
  {
    id: "1951",
    value: "1951",
  },
  {
    id: "1950",
    value: "1950",
  },
  {
    id: "1949",
    value: "1949",
  },
  {
    id: "1948",
    value: "1948",
  },
  {
    id: "1947",
    value: "1947",
  },
  {
    id: "1946",
    value: "1946",
  },
  {
    id: "1945",
    value: "1945",
  },
];

function Page() {
  const [chart, setChart] = useState<any>(undefined);
  const [album, setAlbum] = useState<Record<any, any> | undefined>(undefined);
  const [year, setYear] = useState<string>("2023");

  const getData = async () => {
    const req = await fetch(`./data/albums/${year}.json`);
    const data = await req.json();

    setChart(data);
  };

  useEffect(() => {
    getData();
  }, [year]);

  return (
    <>
      <div className={album ? "open" : ""} id="player">
        {album && <Player album={album} />}
      </div>

      <div id="chart" className="chart">
        <div className="inner">
          {chart && (
            <>
              <div className="title-bar">
                <div className="select-title">
                  RYM's best from{" "}
                  <Select
                    data={selectData}
                    setSelected={setYear}
                    current={year}
                  />
                </div>
              </div>
              <div className="chart-wrapper">
                <EditListResults
                  extraClass="frontpage-list"
                  setAlbum={setAlbum}
                  listData={chart}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
