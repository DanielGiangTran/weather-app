"use strict";
let getTermValue = document.getElementById("search-term");
let getLocation = document.getElementById("location");
let getIcon = document.querySelector("#weatherStatus");
let getWeather = document.querySelector("#weather");
let getDescription = document.querySelector("#description");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let searchTerm = getTermValue.value;
  getLocation.textContent = "Loading ...";
  getIcon.src = "";
  getWeather.textContent = "";
  getDescription.textContent = "";
  fetch(`/weather?address=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getLocation.textContent = data.error;
      } else {
        getIcon.src = data.icon;
        getLocation.textContent = data.location;
        getWeather.textContent = `It is currently ${data.weather} degrees out.`;
        getDescription.textContent = `${data.description}.`;
      }
    });
});
