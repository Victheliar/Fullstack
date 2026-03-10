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

const Country = ({country, capital, area, languages, flag}) => {
  return (
    <div>
      <h2>{country}</h2>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
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
    if (countriesToShow.length > 10) {
      return (
        <p>
          Too many matches, specify another filter 
        </p>
      )
    }
    if (countriesToShow.length <= 10) {
      return (
        
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
