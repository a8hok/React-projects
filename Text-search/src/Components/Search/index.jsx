import { useEffect, useState } from "react";

function Search({ searchResult }) {
  const [searchOptions, setSearchOptions] = useState({
    country: "",
    state: "",
  });
  function handleChange(e) {
    // setSearchOptions({ ...searchOptions, [e.target.name]: e.target.value });
    setSearchOptions((prevOptions) => ({
      ...prevOptions,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    searchResult(searchOptions);
  }, [searchOptions]);
  return (
    <div className="search-container">
      <input
        name="country"
        className="search-box"
        type="text"
        placeholder="Search by Country"
        onChange={handleChange}
      />
      <input
        name="state"
        className="search-box"
        type="text"
        placeholder="Search by State"
        onChange={handleChange}
      />
    </div>
  );
}

Search.propTypes = {
  searchResult: () => {},
};

export default Search;
