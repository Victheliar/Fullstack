import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (capital, apiKey) => {
    const request = axios.get(weatherUrl, {
        params: {
            q: capital,
            appid: apiKey,
            units: 'metric'
        }
    })

    return request.then(response => response.data)
}

export default { getAll, getWeather }