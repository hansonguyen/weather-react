import React from "react"
import axios from "axios"

export default function Weather() {
    const [weatherData, setWeatherData] = React.useState({})

    const [location, setLocation] = React.useState("San Jose")

    // Use your API key
    const apiKey = ''
    const units = 'imperial'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`

    React.useEffect(() => {
        axios.get(url)
            .then(response => {
                setWeatherData(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const search = event => {
        if (event.key === 'Enter') {
            axios.get(url)
                .then(response => {
                    setWeatherData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <div className="weather--container">
            <input 
            className="text-input"
            type="text"
            onChange={event => setLocation(event.target.value)}
            onKeyPress={search}
            placeholder="Enter city name"
                />
            <div className="main-weather">
                <h1 className="city">{weatherData.name}</h1>
                {weatherData.main ? <h1 className="temperature">{Math.round(weatherData.main.temp)}°F</h1> : null}
                {weatherData.weather ? <img className="weather-icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}/> : null}
                {weatherData.weather ? <p className="description">{weatherData.weather[0].description}</p> : null}
                <div className="high-low-temps">
                    {weatherData.main ? <h1>High: {Math.round(weatherData.main.temp_max)}</h1> : null}
                    {weatherData.main ? <h1>Low: {Math.round(weatherData.main.temp_min)}</h1> : null}
                </div>
            </div>
        </div>
    )
}