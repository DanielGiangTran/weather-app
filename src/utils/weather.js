"use strict";
const request = require("request");
const secrets = require("../../secrets.json");
const weather_APIKey = secrets.weather_stack.API_KEY;
const weather_APIEndPoint = "http://api.weatherstack.com/current?";

const getWeather = (
  { latitude, longitude, location, exactLocation } = {},
  callback
) => {
  const weather_URL = `${weather_APIEndPoint}access_key=${weather_APIKey}&query=${location}`;

  request({ url: weather_URL, json: true }, (error, response, body) => {
    if (error) {
      callback("Can not connect to the weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};
module.exports = getWeather;
