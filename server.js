// import axios from "axios";
// Require the Express library and create an instance of the app
const getWeather = require('./weather')
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
const { config } = require('dotenv');
config()
// Require the weather data JSON file
const weatherData = require("./Data/weather.json");
const getMovie = require('./movie');

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
  res.send("Welcome to the Matrix :)"); // Send a response with the message "What it doo family"
});

// Define a route at the endpoint '/weather'
app.get("/weather", async (req, res) => {
  // Extract the latitude, longitude, and search query from the request's query parameters
  let lat = req.query.lat;
  let lon = req.query.lon;
let weather = await getWeather(lat, lon)
      res.send(weather);
    }
  // }
);



app.get("/movies", async (req, res) => {
  let movie = req.query.movie
  let Currentmovie = await getMovie(movie)
  res.send(Currentmovie)
})


//   let movieSelected = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.movie}`)
//  if(movieSelected.data.results.length === 0){
//    res.status(400).send("Try again nigga")
//  }else{
// }
// Error handling middleware, must be the last app.use()
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message);
});

// Start the server listening on port 3000
app.listen(3000, () => {
  console.log("server listening on port 3000");
});

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