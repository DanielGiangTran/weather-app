const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);
//Setup static directory to serve
app.use(express.static(publicDirPath));

//Setup routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Daniel Tran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "To understand how this app was developed, please visit:",
    githubLink: "https://github.com/DanielGiangTran/weather-app",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Daniel Tran",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please enter a search term" });
  }
  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send({ error: err });
    } else {
      weather(data, (weatherErr, weatherData) => {
        if (weatherErr) {
          return res.send({ error: weatherErr });
        }
        res.send({
          location: data.location,
          weather: weatherData.temperature,
          description: weatherData.weather_descriptions[0],
          icon: weatherData.weather_icons[0],
        });
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    name: "Daniel",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ",
    name: "Daniel",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
