import { useEffect, useState } from "react";

import "./App.css";
import Search from "./Components/Search";
import List from "./Components/Universities/List";
import { apiUrl, limit } from "./Utils/constants";

function App() {
  const [uniInfo, setUniInfo] = useState([]);

  function getUrl() {
    return `${apiUrl}?limit=${limit}`;
    // return ${apiUrl};
  }

  function searchResult(searchOptions) {
    let result = [];
    if (searchOptions.country.length > 3) {
      result = uniInfo.filter((obj) => {
        return obj.country === searchOptions.country;
      });
      if (result.length > 0) {
        setUniInfo(result);
      } else {
        fetchData();
      }
    }
  }

  async function fetchData() {
    const url = getUrl();
    const univResponse = await fetch(url);
    const univData = await univResponse.json();
    setUniInfo(univData);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="header">Universities</div>
      <Search searchResult={searchResult} />
      <List uniInfo={uniInfo} />
    </>
  );
}

export default App;
