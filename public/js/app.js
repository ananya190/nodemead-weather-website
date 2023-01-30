console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const locationInfo = document.querySelector("#location-info");
const forecastInfo = document.querySelector("#forecast-info");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // keep the browser from refreshing
  const location = search.value;
  console.log(location);
  locationInfo.textContent = "Loading...";
  forecastInfo.textContent = "";
  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationInfo.textContent = data.error;
      } else {
        locationInfo.textContent = data.location;
        forecastInfo.textContent = data.forecast;
      }
    });
  });
});
