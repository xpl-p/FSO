const CountryList = ({ countries, displayInfo }) => {
  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country}>
            {country}
            <button onClick={() => displayInfo(country)}>Show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;