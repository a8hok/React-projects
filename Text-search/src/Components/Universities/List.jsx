function list({ uniInfo, filteredInfo }) {
  if (filteredInfo.length > 0) {
    uniInfo = filteredInfo;
  }
  return (
    <div className="uni-list-container">
      {filteredInfo.length === 0 && <p className='w-100'>No search results</p>}
      {uniInfo.map((uni, index) => (
        <div className="uni-list" key={index}>
          <div className="uni-name">
            <a target="_blank" href={uni.web_pages[0]}>
              {uni.name}
            </a>
          </div>
          <div className="uni-state">{uni["state-province"]}</div>
          <div className="uni-country">{uni.country}</div>
        </div>
      ))}
    </div>
  );
}

export default list;
