import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Filter = ({filter}) => {
  return (
    <form>
      <div>
        find countries <input onChange={filter} />
      </div>
    </form>
  )
}

const Search = ({result}) => {
  return (
    <div>
      {result}
    </div>
  )
}

const Country = ({country}) => {
  console.log(country[0].flags.png)
  return (
    <div>
      <h2>{country[0].name.common}</h2>
      <p>Capital {country[0].capital}</p>
      <p>Area {country[0].area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country[0].languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country[0].flags.png}></img>
    </div>
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  })

  const handleSearch = () => {
    if (countriesToShow.length === 1) {
      return (
        <Country country={countriesToShow} />
      )
    }
    if (countriesToShow.length > 10) {
      return (
        <p>
          Too many matches, specify another filter 
        </p>
      )
    }
    if (countriesToShow.length <= 10) {
      return (
        <ul>
          {countriesToShow.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        </ul>
      )
    }
  }

  return (
    <div>
      <Filter filter={handleNewFilter} />
      <Search result={handleSearch()} />
    </div>
  )

}

export default App
