const axios = require("axios");
const secrets = require("../../secrets.json");
const mapBox_APIKey = secrets.map_box.API_KEY;

const geoCode = (address, callback) => {
  const mapBox_APIEndPoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?`;
  const mapBox_URL = `${mapBox_APIEndPoint}access_token=${mapBox_APIKey}&limit=1`;
  axios
    .get(mapBox_URL)
    .then(function (response) {
      // handle success
      if (response.data.features.length > 0) {
        const [getData] = response.data.features;
        const {
          center: [longitude, latitude],
          place_name,
          text,
        } = getData;
        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
          location: place_name,
          exactLocation: text,
        });
      } else if (response.data.features.length == 0) {
        callback("Can not find that location", undefined);
      }
    })
    .catch(function (error) {
      // handle error
      if (error) {
        callback("Unable to connect the the geolocation service", undefined);
      }
    })
    .then(function () {
      // always executed
    });
};
module.exports = geoCode;
