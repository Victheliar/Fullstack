import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const apiKey = import.meta.env.VITE_WEATHER_KEY

const Filter = ({ filter }) => {
  return (
    <form>
      <div>
        find countries <input onChange={filter} />
      </div>
    </form>
  )
}

const Search = ({ result }) => {
  return (
    <div>
      {result}
    </div>
  )
}

const Country = ({ country, apiKey }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital?.[0]

  useEffect(() => {
    if (!capital || !apiKey) {
      return
    }

    countriesService
      .getWeather(capital, apiKey)
      .then(response => {
        setWeather(response)
      })
  }, [capital, apiKey])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h3>Weather in {capital}</h3>
      {weather && (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
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
        <Country country={countriesToShow[0]} apiKey={apiKey} />
      )
    }
    if (countriesToShow.length > 10) {
      return (
        <p>
          Too many matches, specify another filter 
        </p>
      )
    }
    if (countriesToShow.length > 1) {
      return (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.name.common}>
              {country.name.common} <button onClick={() => setNewFilter(country.name.common)}>Show</button>
            </li>
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
