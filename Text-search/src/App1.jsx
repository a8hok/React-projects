import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import List from "./Components/Universities/List";
import { apiUrl, limit } from "./Utils/constants";

function App() {
  const [uniInfo, setUniInfo] = useState([]);
  const [searchOptions, setSearchOptions] = useState({ country: "" });

  const getUrl = useCallback(() => `${apiUrl}?limit=${limit}`, []);

  const fetchData = useCallback(async () => {
    if (uniInfo.length === 0) {
      try {
        const response = await fetch(getUrl());
        const data = await response.json();
        setUniInfo(data);
      } catch (error) {
        console.error("Failed to fetch university data:", { cause: error });
      }
    }
  }, [getUrl, uniInfo]);

  const filteredInfo = useMemo(() => {
    if (searchOptions.country.length >= 3) {
      const searchCountry = searchOptions.country.toLowerCase();
      return uniInfo.filter(
        (obj) => obj.country.toLowerCase() === searchCountry
      );
    }
    return uniInfo;
  }, [uniInfo, searchOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (options) => {
    setSearchOptions(options);
  };

  return (
    <>
      <div className="header">Universities</div>
      <Search searchResult={handleSearch} />
      <List uniInfo={filteredInfo} />
    </>
  );
}

export default App;
