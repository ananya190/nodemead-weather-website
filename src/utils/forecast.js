const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.FORECAST_APIKEY +
    "&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=f";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Error with coordinates, please try again", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      const response_string =
        weather_descriptions[0] +
        ". It is currently " +
        temperature +
        " degrees out. It feels like " +
        feelslike +
        " degrees out.";
      callback(undefined, response_string);
    }
  });
};

module.exports = forecast;
