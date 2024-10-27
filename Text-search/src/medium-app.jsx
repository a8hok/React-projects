import { useCallback, useEffect, useState } from "react";

import "./App.css";
import Search from "./Components/Search";
import List from "./Components/Universities/List";
import { apiUrl, limit } from "./Utils/constants";

function App() {
  const [uniInfo, setUniInfo] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);

  const getUrl = useCallback(() => `${apiUrl}?limit=${limit}`, []);

  const searchResult = useCallback(
    (searchOptions) => {
      if (searchOptions.country.length >= 3) {
        const result = uniInfo.filter(
          (obj) =>
            obj.country.toLowerCase() === searchOptions.country.toLowerCase()
        );
        setFilteredInfo(result.length > 0 ? result : uniInfo);
      } else {
        setFilteredInfo(uniInfo);
      }
    },
    [uniInfo]
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(getUrl());
      const data = await response.json();
      setUniInfo(data);
      setFilteredInfo(data);
    } catch (error) {
      console.error("Failed to fetch university data:", { cause: error });
    }
  }, [getUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="header">Universities</div>
      <Search searchResult={searchResult} />
      <List uniInfo={filteredInfo} />
    </>
  );
}

export default App;
