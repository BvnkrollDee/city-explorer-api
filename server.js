// Require the Express library and create an instance of the app
const express = require("express");
const app = express();
const cors = require("cors");

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
app.get("/weather", (req, res) => {
  // Extract the latitude, longitude, and search query from the request's query parameters
  let lat = req.query.lat;
  let lon = req.query.lon;

  // If any of the required parameters are missing, send an error message in the response
  if (lat === undefined || lon === undefined) {
    res.send("NOOOOO");
  } else {
    // Search the weather data for a forecast that matches the given latitude, longitude, and search query
    let correctForecast = weatherData.find((city) => {
      if (
        city.lat == lat &&
        city.lon == lon
        // city.city_name === searchQuery
      ) {
        return true;
      } else {
        return false;
      }
    });

    // If no matching forecast is found, send an error message in the response
    if (correctForecast === undefined) {
      res.send("error");
    } else {
      let newArray = [];
      newArray = correctForecast.data.map((forecast) => {
        return new Forecast(forecast.datetime, forecast.weather.description);
      });

      // If a matching forecast is found, send it in the response
      res.send(newArray);
    }
  }
});

// Error handling middleware, must be the last app.use()
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message);
});

// Start the server listening on port 3000
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
