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

  // Consolidate URL directly within fetchData
  const fetchData = useCallback(async () => {
    if (!isLoading) return;

    try {
      const response = await fetch(`${apiUrl}?limit=${limit}`);
      const data = await response.json();
      setUniInfo(data);
    } catch (error) {
      console.error("Failed to fetch university data:", { cause: error });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const filterUniversities = useCallback(() => {
    const { country, state } = searchOptions;
    const lowerCountry = country.toLowerCase();
    const lowerState = state.toLowerCase();

    return uniInfo.filter(({ country, "state-province": stateProvince }) => {
      const matchCountry =
        !lowerCountry || country.toLowerCase().includes(lowerCountry);
      const matchState =
        !lowerState ||
        (stateProvince?.toLowerCase() ?? "no state").includes(lowerState);
      return matchCountry && matchState;
    });
  }, [searchOptions, uniInfo]);

  const filteredInfo = useMemo(filterUniversities, [filterUniversities]);

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
