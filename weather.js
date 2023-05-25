const axios = require("axios")
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }

async function getWeather(lat, lon ){
  let value = myCache.get(`${lat}, ${lon}`)
  if(value !== undefined){
    return value}else{
     // If any of the required parameters are missing, send an error message in the response
  if (lat === undefined || lon === undefined) {
    return ("NOOOOO");
  } else {
    // Search the weather data for a forecast that matches the given latitude, longitude, and search query
    let correctForecastFromAPI = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
    console.log(correctForecastFromAPI.data)
    // console.log(correctForecastFromAPI.data)
    let newArray = [];
    newArray = correctForecastFromAPI.data.data.map((forecast) => {
        return new Forecast(forecast.datetime, forecast.weather.description);
      });
      let weatherCache = myCache.set(`${lat}, ${lon}`, correctForecastFromAPI.data.data, 3600 )
      // If a matching forecast is found, send it in the response
      return(newArray);
    }
  }
}

module.exports = getWeather