import { useEffect, useState } from 'react'
import CountryInfo from './components/CountryInfo'
import CountryList from './components/CountryList'
import Search from './components/Search'
import axios from 'axios'

function App() {  
  const [allCountries, setAllCountries] = useState([])
  const [capital, setCapital] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState(null)
  const [listBool, setListBool] = useState(false)
  const [message, setMessage] = useState('')
  const [lookup, setLookup] = useState('')

  const handleLookup = (event) => setLookup(event.target.value)
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data.map(country => country.name.common))
      })
  }, [])


  useEffect(() => {
    if (!lookup) {
      return
    }
    const filtered = allCountries.filter(country => country.toLowerCase().includes(lookup))
    setFilteredCountries(filtered)
    if (filtered.length > 10) {
      setCountryInfo(null)
      setMessage('Narrow search to see results')
      setListBool(false)
    } else if (filtered.length === 1){
      const c = filtered[0]
      displayInfo(c)
    } else {
      setCountryInfo(null)
      setMessage('')
      setListBool(true)
    }
  }, [lookup, allCountries])

  const displayInfo = (country) => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then(response => {
      setCountryInfo(response.data)
      setMessage('')
      setListBool(false)
      setCapital(response.data.capital)
    })
  }

  return (
    <div>
      <Search onChange={handleLookup} />
      {message && <p>{message}</p>}
      {countryInfo 
        ? ( 
          <>
            <CountryInfo country={countryInfo}/>
          </>
        ) : listBool ? (
        <CountryList countries={filteredCountries} displayInfo={displayInfo}/>
        ) : null
      }
    </div>
  )
}

export default App
