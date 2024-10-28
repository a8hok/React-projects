import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./App.css";
import Search from "./Components/Search";
import { apiUrl, limit } from "./Utils/Constants";

function App() {
  const [uniInfo, setUniInfo] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    country: "",
    state: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const List = lazy(() => import("./Components/Universities/List"));

  const getUrl = useCallback(() => `${apiUrl}?limit=${limit}`, []);

  const fetchData = useCallback(async () => {
    if (uniInfo.length === 0) {
      try {
        const response = await fetch(getUrl());
        const data = await response.json();
        setUniInfo(data);
      } catch (error) {
        console.error("Failed to fetch university data:", { cause: error });
      } finally {
        setIsLoading(false);
      }
    }
  }, [getUrl, uniInfo]);

  const filteredInfo = useMemo(() => {
    const { country, state } = searchOptions;
    // both has value
    // any one has value
    // no value - default handle
    if (country.length >= 3 || state.length >= 3) {
      const searchTerm =
        country.length && state.length
          ? "both"
          : country.length
          ? "country"
          : state.length
          ? "state"
          : "No search term";

      switch (searchTerm) {
        case "both":
          return uniInfo.filter((obj) => {
            const countryObj = obj.country.toLowerCase();
            const stateObj = obj["state-province"]
              ? obj["state-province"].toLowerCase()
              : "no state";

            return (
              countryObj.includes(country.toLowerCase()) &&
              stateObj.includes(state.toLowerCase())
            );
          });

        case "country":
          return uniInfo.filter((obj) =>
            obj.country.toLowerCase().includes(country.toLowerCase())
          );

        case "state":
          return uniInfo.filter((obj) => {
            const stateObj = obj["state-province"] ?? "no state";
            return stateObj.toLowerCase().includes(state.toLowerCase());
          });

        default:
          return uniInfo;
      }
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

      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <Suspense fallback={<div>Loading Components...</div>}>
          <List uniInfo={uniInfo} filteredInfo={filteredInfo} />
        </Suspense>
      )}
    </>
  );
}

export default App;
