// import axios from "axios";
// Require the Express library and create an instance of the app
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
const { config } = require('dotenv');
config()
// Require the weather data JSON file
const weatherData = require("./Data/weather.json");

// Define a Forecast class that takes a date and description as parameters
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// Define a route at the endpoint '/'
app.get("/", (req, res) => {
  res.send("What it doo family"); // Send a response with the message "What it doo family"
});

// Define a route at the endpoint '/weather'
app.get("/weather", async (req, res) => {
  // Extract the latitude, longitude, and search query from the request's query parameters
  let lat = req.query.lat;
  let lon = req.query.lon;

  // If any of the required parameters are missing, send an error message in the response
  if (lat === undefined || lon === undefined) {
    res.send("NOOOOO");
  } else {
    // Search the weather data for a forecast that matches the given latitude, longitude, and search query
    let correctForecastFromAPI = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
    console.log(correctForecastFromAPI.data)
    // console.log(correctForecastFromAPI.data)
    // let correctForecast = weatherData.find((city) => {
    //   if (
    //     city.lat == lat &&
    //     city.lon == lon
    //     // city.city_name === searchQuery
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    // // If no matching forecast is found, send an error message in the response
    // if (correctForecast === undefined) {
    //   res.send("error");
    // } else {
      let newArray = [];
      newArray = correctForecastFromAPI.data.data.map((forecast) => {
        return new Forecast(forecast.datetime, forecast.weather.description);
      });

      // If a matching forecast is found, send it in the response
      res.send(newArray);
    }
  // }
});

class Movie{
  constructor(adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count){
this.adult = adult    
this.backdrop_path = backdrop_path
this.genre_ids = genre_ids
this.id = id
this.original_language = original_language
this.original_title = original_title
this.overview = overview
this.popularity = popularity
this.poster_path = poster_path
this.release_date = release_date
this.title = title
this.video = video
this.vote_average = vote_average
this.vote_count = vote_count    
  }
}

app.get("/movies", async (req, res) => {
  let movieSelected = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.movie}`)
 if(movieSelected.data.results.length === 0){
  res.status(400).send("Try again nigga")
 }else{
  res.send(movieSelected.data.results)
}
})


// Error handling middleware, must be the last app.use()
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message);
});

// Start the server listening on port 3000
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
