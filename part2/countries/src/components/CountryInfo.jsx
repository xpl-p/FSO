const CountryInfo = (data) => {
  const name = data.country.name.common
  const capital = data.country.capital[0]
  const area = data.country.area
  const language = data.country.languages
  console.log(language);
  
  const flag = data.country.flags.png

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.keys(language).map(key => <li key={key}>{language[key]}</li>)}
      </ul>
      <img src={flag} alt={`Flag of ${name}`} width="200" />
    </div>
  )
}



export default CountryInfo