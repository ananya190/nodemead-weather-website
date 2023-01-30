const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=" +
    process.env.GEOCODE_APIKEY +
    "&limit=1&query=" +
    encodeURIComponent(address);
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Invalid query, please try again", undefined);
    } else if (body.data.length === 0) {
      callback("Unable to find location, please try another search", undefined);
    } else {
      const {
        latitude,
        longitude,
        location = body.data[0].locality +
          ", " +
          body.data[0].region +
          ", " +
          body.data[0].country,
      } = body.data[0];
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
